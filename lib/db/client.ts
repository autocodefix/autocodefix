/**
 * AUTO CODE FIX — Supabase client (server-side only)
 *
 * Uses the Service Role key so it bypasses RLS for all read/write.
 * NEVER import this in client components (no 'use client' files).
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

let _client: SupabaseClient<Database> | null = null

export function getSupabaseClient(): SupabaseClient<Database> {
  if (_client) return _client

  const url  = process.env.SUPABASE_URL
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Supabase env vars missing: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. ' +
      'See .env.example for setup instructions.'
    )
  }

  _client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  })

  return _client
}

/** Returns true when Supabase env vars are present */
export function isSupabaseConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
