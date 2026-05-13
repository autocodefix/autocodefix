import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const rateMap = new Map<string, { count: number; ts: number }>()
function rateLimit(ip: string, max = 30, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now - entry.ts > windowMs) { rateMap.set(ip, { count: 1, ts: now }); return true }
  if (entry.count >= max) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  let body: { messages?: Array<{ role: string; content: string }> }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { messages } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Missing messages array' }, { status: 400 })
  }

  const cleaned = messages
    .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-10)
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 })

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
        max_tokens: 600,
        system: `You are OBD2 Pro AI Assistant — an expert automotive diagnostic technician.
You help users understand OBD2/OBD-II fault codes, symptoms, causes, and repair options.
Keep answers concise (3-5 sentences max), friendly, and practical.
Always mention severity and whether it's DIY-friendly.
If asked about a specific code, give: what it means, top 2-3 causes, and the fix.
Do NOT use markdown bold or headers — plain conversational text only.`,
        messages: cleaned,
      }),
    })

    const data = await res.json()
    const reply = data.content?.map((b: { text?: string }) => b.text ?? '').join('') ?? ''
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[/api/chat]', err)
    return NextResponse.json({ error: 'Chat failed. Please try again.' }, { status: 500 })
  }
}
