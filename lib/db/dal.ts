// @ts-nocheck
/**
 * AUTO CODE FIX — Data Access Layer (DAL)
 *
 * ALL database queries live here. Pages / API routes import from this file,
 * never directly from Supabase or codes-db.ts.
 *
 * Strategy:
 *   - If SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set → use Supabase
 *   - Otherwise → fall back to the static local codes-db.ts (dev / preview)
 *
 * This means:
 *   ✅ Local dev works without a database
 *   ✅ Production uses real Postgres with full-text search
 *   ✅ Zero code changes needed when migrating
 */

import type { OBDCode, Category, Severity } from '@/lib/codes-db'
import { isSupabaseConfigured, getSupabaseClient } from './client'

// ── Static fallback (always available) ──────────────────────────────────────
import {
  CODES as STATIC_CODES,
  CATEGORY_META as STATIC_CAT_META,
  getRelatedCodes as staticRelated,
  getCategoryStats as staticCatStats,
} from '@/lib/codes-db'

// ── Types ────────────────────────────────────────────────────────────────────
export interface SearchResult {
  code: string
  name: string
  cat: Category
  sev: Severity
  desc?: string
}

export interface CategoryStats {
  total: number
  high: number
  med: number
  low: number
  diy: number
}

// ── Row → OBDCode mapper ─────────────────────────────────────────────────────
function rowToOBDCode(row: {
  code: string; name: string; cat: string; sev: string;
  description: string | null; causes: string[]; symptoms: string[];
  solutions: string[]; diy: boolean; avg_cost: string;
  tip: string | null; img_url: string | null; video_url: string | null;
}): OBDCode {
  return {
    code:      row.code,
    name:      row.name,
    cat:       row.cat as Category,
    sev:       row.sev as Severity,
    desc:      row.description ?? undefined,
    causes:    row.causes,
    symptoms:  row.symptoms,
    solutions: row.solutions,
    diy:       row.diy,
    avg_cost:  row.avg_cost,
    tip:       row.tip ?? undefined,
    img:       row.img_url ?? undefined,
    video:     row.video_url ?? undefined,
  }
}

// ── getCode ──────────────────────────────────────────────────────────────────
export async function getCode(slug: string): Promise<OBDCode | null> {
  if (!isSupabaseConfigured()) {
    return STATIC_CODES.find(c => c.code.toLowerCase() === slug.toLowerCase()) ?? null
  }

  const { data, error } = await getSupabaseClient()
    .from('obd_codes')
    .select('*')
    .ilike('code', slug)
    .single()

  if (error || !data) return null
  return rowToOBDCode(data)
}

// ── getAllCodes (for generateStaticParams) ───────────────────────────────────
export async function getAllCodes(): Promise<{ code: string }[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_CODES.map(c => ({ code: c.code.toLowerCase() }))
  }

  const { data, error } = await getSupabaseClient()
    .from('obd_codes')
    .select('code')
    .order('code')

  if (error || !data) return STATIC_CODES.map(c => ({ code: c.code.toLowerCase() }))
  return ((data as any) || []).map((r: any) => ({ code: r.code.toLowerCase() }))
}

// ── getAllFullCodes (for homepage — returns complete OBDCode objects) ──────────
export async function getAllFullCodes(): Promise<OBDCode[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_CODES
  }

  const { data, error } = await getSupabaseClient()
    .from('obd_codes')
    .select('*')
    .order('code')

  if (error || !data) return STATIC_CODES
  return data.map(rowToOBDCode)
}

// ── getCodesByCategory ────────────────────────────────────────────────────────
export async function getCodesByCategory(cat: Category): Promise<OBDCode[]> {
  if (!isSupabaseConfigured()) {
    return STATIC_CODES.filter(c => c.cat === cat)
  }

  const { data, error } = await getSupabaseClient()
    .from('obd_codes')
    .select('*')
    .eq('cat', cat)
    .order('sev')   // high → med → low

  if (error || !data) return STATIC_CODES.filter(c => c.cat === cat)
  return data.map(rowToOBDCode)
}

// ── getRelatedCodes ──────────────────────────────────────────────────────────
export async function getRelatedCodes(code: OBDCode, limit = 6): Promise<OBDCode[]> {
  if (!isSupabaseConfigured()) {
    return staticRelated(code, limit)
  }

  // Same category, excluding current code, boosting same code family (P030x etc.)
  const { data, error } = await getSupabaseClient()
    .from('obd_codes')
    .select('*')
    .eq('cat', code.cat)
    .neq('code', code.code)
    .limit(limit * 3)   // fetch more so we can re-rank

  if (error || !data) return staticRelated(code, limit)

  const prefix = code.code.slice(0, 4)
  const scored = data
    .map(row => {
      let score = 10
      if (row.code.startsWith(prefix)) score += 8
      if (row.sev === code.sev) score += 3
      return { row, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => rowToOBDCode(s.row))

  return scored
}

// ── searchCodes ──────────────────────────────────────────────────────────────
export async function searchCodes(query: string, limit = 8): Promise<SearchResult[]> {
  if (!isSupabaseConfigured()) {
    // Use existing static search function
    const { searchCodes: staticSearch } = await import('@/lib/codes-db')
    return staticSearch(query, limit).map(r => ({
      code: r.code,
      name: r.name,
      cat:  r.cat,
      sev:  r.sev,
      desc: r.desc,
    }))
  }

  // Use the scored Postgres function (full-text + trigram + exact)
  const { data, error } = await getSupabaseClient()
    .rpc('search_obd_codes', { query: query.trim(), max_rows: limit })

  if (error || !data) {
    const { searchCodes: staticSearch } = await import('@/lib/codes-db')
    return staticSearch(query, limit).map(r => ({
      code: r.code, name: r.name, cat: r.cat, sev: r.sev, desc: r.desc,
    }))
  }

  return data.map(r => ({
    code: r.code,
    name: r.name,
    cat:  r.cat as Category,
    sev:  r.sev as Severity,
    desc: r.description ?? undefined,
  }))
}

// ── getCategoryStats ──────────────────────────────────────────────────────────
export async function getCategoryStats(cat: Category): Promise<CategoryStats> {
  if (!isSupabaseConfigured()) {
    return staticCatStats(cat)
  }

  const { data, error } = await getSupabaseClient()
    .from('category_stats')
    .select('*')
    .eq('cat', cat)
    .single()

  if (error || !data) return staticCatStats(cat)

  return {
    total: Number(data.total),
    high:  Number(data.high),
    med:   Number(data.med),
    low:   Number(data.low),
    diy:   Number(data.diy),
  }
}

// ── getAllCategoryStats ───────────────────────────────────────────────────────
export async function getAllCategoryStats(): Promise<Record<Category, CategoryStats>> {
  if (!isSupabaseConfigured()) {
    const cats = Object.keys(STATIC_CAT_META) as Category[]
    return Object.fromEntries(
      cats.map(cat => [cat, staticCatStats(cat)])
    ) as Record<Category, CategoryStats>
  }

  const { data, error } = await getSupabaseClient()
    .from('category_stats')
    .select('*')

  if (error || !data) {
    const cats = Object.keys(STATIC_CAT_META) as Category[]
    return Object.fromEntries(
      cats.map(cat => [cat, staticCatStats(cat)])
    ) as Record<Category, CategoryStats>
  }

  return Object.fromEntries(
    data.map(r => [r.cat, {
      total: Number(r.total),
      high:  Number(r.high),
      med:   Number(r.med),
      low:   Number(r.low),
      diy:   Number(r.diy),
    }])
  ) as Record<Category, CategoryStats>
}

// ── getCategoryMeta (merged static meta + live counts) ───────────────────────
export async function getCategoryMeta() {
  const liveStats = await getAllCategoryStats()

  return Object.fromEntries(
    (Object.keys(STATIC_CAT_META) as Category[]).map(cat => [
      cat,
      {
        label: STATIC_CAT_META[cat].label,
        icon:  STATIC_CAT_META[cat].icon,
        count: liveStats[cat]?.total ?? STATIC_CAT_META[cat].count,
      },
    ])
  ) as typeof STATIC_CAT_META
}
