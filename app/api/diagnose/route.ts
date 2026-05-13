import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Simple in-memory rate limit (upgrade to Redis/Upstash in production)
const rateMap = new Map<string, { count: number; ts: number }>()

function rateLimit(ip: string, max = 30, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now - entry.ts > windowMs) {
    rateMap.set(ip, { count: 1, ts: now })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
  }

  let body: { code?: string; name?: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { code, name } = body
  if (!code || !name) {
    return NextResponse.json({ error: 'Missing required fields: code, name' }, { status: 400 })
  }
  if (!/^[PBCU]\d{4}$/i.test(code)) {
    return NextResponse.json({ error: 'Invalid OBD2 code format' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are an expert ASE-certified automotive technician. For OBD2 code ${code.toUpperCase()} (${name}), provide a concise diagnosis. Reply ONLY with valid JSON — no markdown, no preamble:
{
  "causes": ["cause 1","cause 2","cause 3","cause 4"],
  "symptoms": ["symptom 1","symptom 2","symptom 3"],
  "solutions": ["step 1","step 2","step 3","step 4"],
  "diy": true,
  "avg_cost": "$X–$Y",
  "tip": "One pro tip sentence."
}`
        }],
      }),
    })

    const data = await res.json()
    const raw = data.content?.map((b: { text?: string }) => b.text ?? '').join('') ?? ''
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    if (!parsed.causes || !parsed.symptoms || !parsed.solutions) {
      throw new Error('Unexpected AI response shape')
    }

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('[/api/diagnose]', err)
    return NextResponse.json({ error: 'Diagnosis failed. Please try again.' }, { status: 500 })
  }
}
