"use client";

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import { OBDCode, Category, Severity } from '@/lib/codes-db'

interface CategoryMeta { label: string; icon: string; count: number }

interface Props {
  codes: OBDCode[]
  categoryMeta: Record<Category, CategoryMeta>
}

const SEV_HEX: Record<Severity, string> = { high: '#FF1744', med: '#FFC107', low: '#00C853' }
const SEV_LABEL: Record<Severity, string> = { high: 'Critical', med: 'Moderate', low: 'Minor' }

export default function HomeClient({ codes, categoryMeta }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState(searchParams?.get('q') ?? '')
  const [activeSev, setActiveSev] = useState<Severity | 'all'>('all')

  // Sync ?q= param from URL
  useEffect(() => {
    const q = searchParams?.get('q') ?? ''
    if (q) {
      setSearch(q)
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = codes
    if (activeSev !== 'all') list = list.filter(c => c.sev === activeSev)
    if (search.trim()) {
      const q = search.trim().toUpperCase()
      list = list.filter(c =>
        c.code.includes(q) ||
        c.name.toUpperCase().includes(q) ||
        c.desc?.toUpperCase().includes(q) ||
        c.causes.some(x => x.toUpperCase().includes(q))
      )
    }
    return list
  }, [codes, activeSev, search])

  const handleSearch = (q: string) => {
    setSearch(q)
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const categories = Object.entries(categoryMeta) as [Category, CategoryMeta][]

  return (
    <>
      {/* HERO */}
      <div style={{
        background: 'var(--dark2)', padding: '5rem 2rem 4rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 260,
          background: 'radial-gradient(ellipse, rgba(255,87,34,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-block', background: 'rgba(255,87,34,0.12)', color: 'var(--orange)',
          border: '1px solid rgba(255,87,34,0.3)', borderRadius: 20,
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: 2,
          textTransform: 'uppercase', padding: '5px 16px', marginBottom: '1.5rem',
        }}>
          🔧 Free Diagnostic Tool
        </div>

        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(3.5rem,9vw,7rem)',
          letterSpacing: 5, lineHeight: 0.95, color: 'var(--text)',
        }}>
          DECODE <em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>ANY</em><br />FAULT CODE
        </h1>
        <p style={{
          color: 'var(--muted)', fontSize: '1.1rem', marginTop: '1.25rem',
          maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7,
        }}>
          Instant OBD2 diagnostic trouble code lookup with causes, symptoms, repair guides, and estimated costs.
        </p>

        {/* Real Search bar with autocomplete */}
        <div style={{ maxWidth: 660, margin: '2.5rem auto 0' }}>
          <SearchBar
            large
            initialValue={search}
            placeholder="Type a code: P0300, P0420, or describe a symptom…"
            onSearch={handleSearch}
          />
        </div>

        {/* Quick chips */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          {['P0300', 'P0420', 'P0171', 'P0128', 'P0442', 'U0100'].map(code => (
            <button
              key={code}
              onClick={() => { handleSearch(code) }}
              style={{
                background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 20,
                fontSize: '0.75rem', color: 'var(--muted)', padding: '4px 12px', cursor: 'pointer',
              }}
            >
              {code}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[['2,600+', 'Codes'], ['12', 'Categories'], ['AI', 'Diagnosis'], ['Free', 'Forever']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: 'var(--orange)', letterSpacing: 2 }}>{num}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
            </div>
        ))}
        </div>
      </div>

      {/* CATEGORIES — now linked to real pages */}
      <div id="cats" style={{ padding: '2.5rem 2rem', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', letterSpacing: 2 }}>
            Browse by <span style={{ color: 'var(--orange)' }}>Category</span>
          </div>
          <Link href="/category" style={{ fontSize: '0.82rem', color: 'var(--orange)', textDecoration: 'none', fontWeight: 600 }}>
            View all categories →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
          {/* All codes filter */}
          <button
            onClick={() => setSearch('')}
            style={catBtnStyle(!search)}
          >
            <span style={{ fontSize: '1.9rem' }}>📋</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: !search ? 'var(--orange)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>All Codes</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--orange)', fontWeight: 600 }}>2,600+</span>
          </button>

          {categories.map(([id, meta]) => (
            <Link
              key={id}
              href={`/category/${id}`}
              style={{
                ...catBtnStyle(false),
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,87,34,0.07)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.background = 'var(--card)'
              }}
            >
              <span style={{ fontSize: '1.9rem' }}>{meta.icon}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{meta.label}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--orange)', fontWeight: 600 }}>{meta.count.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* RESULTS */}
      <div id="results" style={{ padding: '0 2rem 4rem', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.25rem', flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 1 }}>
            {search ? `Results for "${search}"` : 'All Codes'}
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{filtered.length} code{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Severity filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {[['all', 'All Severity'], ['high', '🔴 Critical'], ['med', '🟡 Moderate'], ['low', '🟢 Minor']].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveSev(id as Severity | 'all')}
              style={{
                background: activeSev === id ? 'rgba(255,87,34,0.07)' : 'var(--dark3)',
                border: `1px solid ${activeSev === id ? 'var(--orange)' : 'var(--border)'}`,
                borderRadius: 20, fontSize: '0.75rem',
                color: activeSev === id ? 'var(--orange)' : 'var(--muted)',
                padding: '5px 14px', cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Code grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              No codes found for &ldquo;{search}&rdquo;. Try a different search term.
            </div>
          ) : filtered.map(c => (
            <Link
              key={c.code}
              href={`/${c.code.toLowerCase()}`}
              style={{
                background: 'var(--card)', border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '1.25rem',
                textDecoration: 'none', display: 'block',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color .2s, transform .2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <span style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: SEV_HEX[c.sev] }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 8 }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.55rem', letterSpacing: 2, color: 'var(--orange)' }}>
                  {c.code}
                </span>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                  padding: '3px 9px', borderRadius: 20,
                  background: `${SEV_HEX[c.sev]}22`, color: SEV_HEX[c.sev],
                }}>
                  {SEV_LABEL[c.sev]}
                </span>
              </div>
              <div style={{ paddingLeft: 8 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6, lineHeight: 1.4 }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55 }}>{c.desc ?? c.causes[0]}</div>
                <div style={{
                  marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {categoryMeta[c.cat]?.label}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--orange)', fontWeight: 600 }}>
                    View details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

function catBtnStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? 'rgba(255,87,34,0.07)' : 'var(--card)',
    border: `1.5px solid ${active ? 'var(--orange)' : 'var(--border)'}`,
    borderRadius: 'var(--radius)', padding: '1.2rem 0.75rem',
    textAlign: 'center', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    transition: 'all .2s',
  }
}
