"use client";
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  code: string
  name: string
  cat: string
  sev: 'high' | 'med' | 'low'
  desc?: string
}

const SEV_COLOR: Record<string, string> = {
  high: '#FF1744',
  med: '#FFC107',
  low: '#00C853',
}

const SEV_LABEL: Record<string, string> = {
  high: 'Critical',
  med: 'Moderate',
  low: 'Minor',
}

interface Props {
  initialValue?: string
  large?: boolean
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ initialValue = '', large = false, placeholder, onSearch }: Props) {
  const [query, setQuery] = useState(initialValue)
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchResults = useCallback(async (q: string) => {
    if (q.trim().length < 1) {
      setResults([])
      setOpen(false)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=8`)
      const data = await res.json()
      setResults(data.results ?? [])
      setOpen(true)
      setActiveIdx(-1)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchResults(query), 200)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, fetchResults])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navigateToCode = (code: string) => {
    setOpen(false)
    setQuery(code)
    router.push(`/${code.toLowerCase()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) {
      if (e.key === 'Enter') handleSubmit()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (activeIdx >= 0 && results[activeIdx]) {
        navigateToCode(results[activeIdx].code)
      } else {
        handleSubmit()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIdx(-1)
    }
  }

  const handleSubmit = () => {
    if (!query.trim()) return
    // If exact match → go to code page
    const exact = results.find(r => r.code.toLowerCase() === query.trim().toLowerCase())
    if (exact) {
      navigateToCode(exact.code)
      return
    }
    // Otherwise delegate to parent (homepage filter) or navigate
    if (onSearch) {
      onSearch(query.trim())
      setOpen(false)
    } else {
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const sz = large ? 1.05 : 0.9
  const pad = large ? '1.1rem 1.75rem' : '0.7rem 1.2rem'

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', position: 'relative' }}>
        {/* Search icon */}
        <span style={{
          position: 'absolute', left: large ? 22 : 16, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--muted)', pointerEvents: 'none', fontSize: large ? '1.1rem' : '0.9rem',
          zIndex: 1,
        }}>🔍</span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length > 0 && setOpen(true)}
          placeholder={placeholder ?? 'Search codes: P0300, misfire, oxygen sensor…'}
          autoComplete="off"
          spellCheck={false}
          style={{
            width: '100%',
            padding: pad,
            paddingLeft: large ? '3.2rem' : '2.5rem',
            paddingRight: large ? '8rem' : '5rem',
            background: 'var(--dark3)',
            border: `2px solid ${open ? 'var(--orange)' : 'var(--border)'}`,
            borderRadius: 50,
            color: 'var(--text)',
            fontSize: `${sz}rem`,
            outline: 'none',
            transition: 'border-color .2s',
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            background: 'var(--orange)', border: 'none', color: 'white',
            padding: large ? '0.65rem 1.5rem' : '0.45rem 1.1rem',
            borderRadius: 50, fontSize: large ? '0.95rem' : '0.82rem',
            fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div
          ref={dropRef}
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
            background: 'var(--dark2)', border: '1.5px solid var(--border)',
            borderRadius: 16, overflow: 'hidden', zIndex: 9999,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {results.map((r, i) => (
            <button
              key={r.code}
              onMouseDown={() => navigateToCode(r.code)}
              onMouseEnter={() => setActiveIdx(i)}
              style={{
                width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                padding: '0.85rem 1.25rem',
                background: i === activeIdx ? 'rgba(255,87,34,0.08)' : 'transparent',
                borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'background .1s',
              }}
            >
              {/* Severity dot */}
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: SEV_COLOR[r.sev], flexShrink: 0,
              }} />

              {/* Code */}
              <span style={{
                fontFamily: 'var(--font-bebas)', fontSize: '1.15rem',
                color: 'var(--orange)', letterSpacing: 2, minWidth: 64, flexShrink: 0,
              }}>
                {r.code}
              </span>

              {/* Name */}
              <span style={{ fontSize: '0.85rem', color: 'var(--text)', flex: 1, lineHeight: 1.3 }}>
                {r.name}
              </span>

              {/* Severity badge */}
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                padding: '2px 8px', borderRadius: 20,
                background: `${SEV_COLOR[r.sev]}22`, color: SEV_COLOR[r.sev],
                flexShrink: 0,
              }}>
                {SEV_LABEL[r.sev]}
              </span>
            </button>
          ))}

          {/* Footer hint */}
          <div style={{
            padding: '0.55rem 1.25rem',
            fontSize: '0.7rem', color: 'var(--muted)',
            background: 'rgba(0,0,0,0.2)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>↑↓ navigate &nbsp;&nbsp; ↵ select &nbsp;&nbsp; Esc close</span>
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {/* No results hint */}
      {open && !loading && results.length === 0 && query.trim().length > 1 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          background: 'var(--dark2)', border: '1.5px solid var(--border)',
          borderRadius: 16, padding: '1rem 1.25rem', zIndex: 9999,
          fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center',
        }}>
          No codes found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
