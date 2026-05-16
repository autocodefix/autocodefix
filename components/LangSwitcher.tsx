'use client'
import { useState } from 'react'
import { LANGUAGES } from '@/lib/i18n'
import { useLang } from '@/components/LangContext'

export default function LangSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,87,34,0.08)', border: '1px solid rgba(255,87,34,0.25)', borderRadius: 20, padding: '5px 12px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.82rem', fontWeight: 500 }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--dark2)', border: '1px solid var(--border)', borderRadius: 12, padding: '6px', zIndex: 999, minWidth: 160, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: lang === l.code ? 'rgba(255,87,34,0.12)' : 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left', color: lang === l.code ? 'var(--orange)' : 'var(--text)', fontSize: '0.85rem', fontWeight: lang === l.code ? 600 : 400 }}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && <span style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
