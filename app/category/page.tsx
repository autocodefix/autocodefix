import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { CATEGORY_META, Category } from '@/lib/codes-db'
import { getAllCategoryStats } from '@/lib/db/dal'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://autocodefix.com'

export const metadata: Metadata = {
  title: 'OBD2 Code Categories — AUTO CODE FIX',
  description: 'Browse all OBD2 diagnostic trouble code categories including Engine, Transmission, Fuel System, Emissions, ABS, Airbag, HVAC, Electrical, and more.',
  alternates: { canonical: `${BASE}/category` },
}

export default async function CategoriesPage() {
  const categories = Object.keys(CATEGORY_META) as Category[]
  const allStats = await getAllCategoryStats()
  const totalCount = Object.values(allStats).reduce((sum, s) => sum + s.total, 0)

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'All Categories' }]} />

      <div style={{ background: 'var(--dark2)', borderBottom: '1px solid var(--border)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,87,34,0.12)', color: 'var(--orange)',
            border: '1px solid rgba(255,87,34,0.3)', borderRadius: 20,
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: 2,
            textTransform: 'uppercase', padding: '4px 14px', marginBottom: '1rem',
          }}>
            Browse by System
          </div>
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.5rem,7vw,4.5rem)',
            letterSpacing: 4, color: 'var(--text)', lineHeight: 1,
          }}>
            OBD2 Code <span style={{ color: 'var(--orange)' }}>Categories</span>
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '1rem', lineHeight: 1.7 }}>
            Browse {totalCount.toLocaleString()}+ diagnostic trouble codes organized by vehicle system
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {categories.map(cat => {
            const meta = CATEGORY_META[cat]
            const stats = allStats[cat]
            return (
              <Link
                key={cat}
                href={`/category/${cat}`}
                style={{
                  background: 'var(--card)', border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '1.75rem',
                  textDecoration: 'none', display: 'block',
                  transition: 'border-color .2s, transform .2s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: 80, height: 80,
                  background: 'radial-gradient(ellipse at top right, rgba(255,87,34,0.06) 0%, transparent 70%)',
                }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{meta.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-bebas)', fontSize: '1.5rem',
                  letterSpacing: 2, color: 'var(--text)', marginBottom: '0.5rem',
                }}>
                  {meta.label}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '0.65rem', padding: '2px 8px', borderRadius: 20,
                    background: 'rgba(255,23,68,0.15)', color: '#FF1744',
                  }}>🔴 {stats.high} Critical</span>
                  <span style={{
                    fontSize: '0.65rem', padding: '2px 8px', borderRadius: 20,
                    background: 'rgba(255,193,7,0.15)', color: '#FFC107',
                  }}>🟡 {stats.med} Moderate</span>
                  <span style={{
                    fontSize: '0.65rem', padding: '2px 8px', borderRadius: 20,
                    background: 'rgba(0,200,83,0.15)', color: '#00C853',
                  }}>🟢 {stats.low} Minor</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '1rem', borderTop: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                    {stats.total} codes · {stats.diy} DIY
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--orange)', fontWeight: 600 }}>
                    Browse →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}
