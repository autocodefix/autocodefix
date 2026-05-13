'use client'

import { useState } from 'react'

interface DiagnosisResult {
  causes: string[]
  symptoms: string[]
  solutions: string[]
  diy: boolean
  avg_cost: string
  tip?: string
}

export default function AIDiagnosis({ code, name }: { code: string; name: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<DiagnosisResult | null>(null)

  async function loadDiagnosis() {
    setState('loading')
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, name }),
      })
      if (!res.ok) throw new Error('Server error')
      const data: DiagnosisResult = await res.json()
      setResult(data)
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto 2rem', padding: '0 2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 2, marginBottom: '1.25rem' }}>
        AI <span style={{ color: 'var(--orange)' }}>Diagnosis</span>
      </h2>

      <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
        {state === 'idle' && (
          <button
            onClick={loadDiagnosis}
            style={{
              background: 'var(--orange)', border: 'none', color: 'white',
              padding: '0.85rem 2rem', borderRadius: 8,
              fontFamily: 'var(--font-dm)', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            🤖 Get AI-Powered Diagnosis for {code}
          </button>
        )}

        {state === 'loading' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--muted)', fontSize: '0.85rem' }}>
            <div style={{
              width: 18, height: 18, border: '2px solid var(--border)',
              borderTopColor: 'var(--orange)', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            Generating AI diagnosis for {code}…
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {state === 'error' && (
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            ⚠️ AI diagnosis unavailable. Please try again.{' '}
            <button onClick={loadDiagnosis} style={{ color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Retry
            </button>
          </p>
        )}

        {state === 'done' && result && (
          <div>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,87,34,.12)', color: 'var(--orange)', padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>
                💰 {result.avg_cost}
              </span>
              {result.diy
                ? <span style={{ background: 'rgba(0,200,83,.12)', color: 'var(--green)', padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>✅ DIY Possible</span>
                : <span style={{ background: 'rgba(255,23,68,.12)', color: 'var(--red)', padding: '5px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>⚠️ Professional Recommended</span>
              }
            </div>

            {[['⚡ Common Causes', result.causes], ['⚠️ Symptoms', result.symptoms], ['✅ Recommended Fixes', result.solutions]].map(([title, items]) => (
              <div key={title as string} style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--orange)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '0.5rem', fontWeight: 700 }}>
                  {title as string}
                </h4>
                <ul style={{ paddingLeft: '1.2rem' }}>
                  {(items as string[]).map((item, i) => (
                    <li key={i} style={{ marginBottom: 5, fontSize: '0.9rem', color: '#ccc', lineHeight: 1.6 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {result.tip && (
              <div style={{ marginTop: '1rem', padding: '0.85rem', background: 'rgba(255,87,34,.07)', borderLeft: '3px solid var(--orange)', borderRadius: 6, fontSize: '0.85rem', color: 'var(--orange-light)' }}>
                💡 Pro Tip: {result.tip}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
