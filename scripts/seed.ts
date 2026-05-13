/**
 * AUTO CODE FIX — Supabase Seed Script
 *
 * Migrates all static codes from codes-db.ts + codes-db-extended.ts
 * into your Supabase postgres database.
 *
 * Usage:
 *   1. Copy .env.example → .env.local and fill SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *   2. Run the SQL schema first: scripts/001_schema.sql
 *   3. Run this script:
 *        npx ts-node --project tsconfig.seed.json scripts/seed.ts
 *
 * It is safe to run multiple times (upserts on code column).
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

// ── Import all static codes ──────────────────────────────────────────────────
// We import directly (not via DAL) so this script has no circular deps
const { CODES }          = require('../lib/codes-db')
const { EXTENDED_CODES } = require('../lib/codes-db-extended')

const ALL_CODES = [...CODES, ...EXTENDED_CODES]

// ── Init Supabase ─────────────────────────────────────────────────────────────
const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('❌  Missing env vars: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  console.error('    Copy .env.example → .env.local and fill in the values.')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

// ── Helpers ───────────────────────────────────────────────────────────────────
function mapCode(c: any) {
  return {
    code:        c.code,
    name:        c.name,
    cat:         c.cat,
    sev:         c.sev,
    description: c.desc ?? null,
    causes:      c.causes,
    symptoms:    c.symptoms,
    solutions:   c.solutions,
    diy:         c.diy,
    avg_cost:    c.avg_cost,
    tip:         c.tip ?? null,
    img_url:     c.img ?? null,
    video_url:   c.video ?? null,
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`🌱  Seeding ${ALL_CODES.length} codes into Supabase…`)
  console.log(`    URL: ${url}`)
  console.log()

  const BATCH = 50
  let inserted = 0
  let updated  = 0
  let errors   = 0

  for (let i = 0; i < ALL_CODES.length; i += BATCH) {
    const batch = ALL_CODES.slice(i, i + BATCH).map(mapCode)

    const { data, error } = await supabase
      .from('obd_codes')
      .upsert(batch, {
        onConflict: 'code',
        ignoreDuplicates: false,  // update existing rows
      })
      .select('id')

    if (error) {
      console.error(`❌  Batch ${i}–${i + batch.length - 1} failed:`, error.message)
      errors += batch.length
    } else {
      const count = data?.length ?? batch.length
      inserted += count
      console.log(`✅  Batch ${i + 1}–${Math.min(i + BATCH, ALL_CODES.length)} / ${ALL_CODES.length} — ${count} rows upserted`)
    }
  }

  console.log()
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`  Total codes:   ${ALL_CODES.length}`)
  console.log(`  Upserted:      ${inserted}`)
  console.log(`  Errors:        ${errors}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

  if (errors === 0) {
    console.log(`\n🎉  Seed complete! Your Supabase database is ready.`)
    console.log(`    Next: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your`)
    console.log(`    Vercel/production environment variables and deploy.`)
  } else {
    console.error(`\n⚠️   Seed finished with ${errors} errors. Check the messages above.`)
    process.exit(1)
  }
}

seed().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
