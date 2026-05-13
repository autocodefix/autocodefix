import { NextRequest, NextResponse } from 'next/server'
import { searchCodes } from '@/lib/db/dal'

export const runtime = 'nodejs'   // needs Supabase SDK (not edge-compatible)
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q     = req.nextUrl.searchParams.get('q') ?? ''
  const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? '8'), 20)

  if (q.trim().length < 1) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchCodes(q.trim(), limit)
    return NextResponse.json({ results })
  } catch (err) {
    console.error('[search] error:', err)
    return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 })
  }
}
