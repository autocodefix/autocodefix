"use client";
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { CATEGORY_META, Category, Severity, catLabel, sevHex } from '@/lib/codes-db'
import { getCodesByCategory, getCategoryStats } from '@/lib/db/dal'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://autocodefix.com'
const CATEGORIES = Object.keys(CATEGORY_META) as Category[]

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ cat }))
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params
  if (!CATEGORIES.includes(cat as Category)) return {}
  const meta = CATEGORY_META[cat as Category]
  const title = `${meta.label} OBD2 Codes — AUTO CODE FIX`
  const description = `Browse all ${meta.label} OBD2 diagnostic trouble codes. Find causes, symptoms, and repair guides for every ${meta.label.toLowerCase()} fault code.`
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/category/${cat}` },
    openGraph: { title, description, url: `${BASE}/category/${cat}`, type: 'website' },
  }
}

const SEV_HEX: Record<Severity, string> = { high: '#FF1744', med: '#FFC107', low: '#00C853' }
const SEV_LABEL: Record<Severity, string> = { high: 'Critical', med: 'Moderate', low: 'Minor' }

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params
  if (!CATEGORIES.includes(cat as Category)) notFound()

  const category  = cat as Category
  const meta      = CATEGORY_META[category]
  const [codes, stats] = await Promise.all([
    getCodesByCategory(category),
    getCategoryStats(category),
  ])

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${BASE}/category` },
      { '@type': 'ListItem', position: 3, name: meta.label, item: `${BASE}/category/${cat}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Categories', href: '/category' },
        { label: meta.label },
      ]} />

      {/* Category Hero */}
      <div style={{ background: 'var(--dark2)', borderBottom: '1px solid var(--border)', padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 300, height: 300, background: 'radial-gradient(ellipse, rgba(255,87,34,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '3rem' }}>{meta.icon}</span>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(255,87,34,0.12)', color: 'var(--orange)', border: '1px solid rgba(255,87,34,0.3)', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '3px 12px', marginBottom: 8 }}>
                OBD2 Category
              </div>
              <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem,7vw,4.5rem)', letterSpacing: 4, color: 'var(--text)', lineHeight: 1 }}>
                {meta.label} <span style={{ color: 'var(--orange)' }}>Codes</span>
              </h1>
            </div>
          </div>
          {/* Live stats from DB */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              ['Total Codes', stats.total.toString(), 'var(--text)'],
              ['Critical', stats.high.toString(), '#FF1744'],
              ['Moderate', stats.med.toString(), '#FFC107'],
              ['Minor', stats.low.toString(), '#00C853'],
              ['DIY Friendly', stats.diy.toString(), 'var(--orange)'],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.6rem 1.1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', color, letterSpacing: 1 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category nav strip */}
      <div style={{ background: 'var(--dark3)', borderBottom: '1px solid var(--border)', padding: '0.75rem 2rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, maxWidth: 1180, margin: '0 auto', whiteSpace: 'nowrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, flexShrink: 0 }}>Categories:</span>
          <Link href="/category" style={{ fontSize: '0.75rem', color: 'var(--muted)', textDecoration: 'none', padding: '4px 12px', borderRadius: 20, border: '1px solid var(--border)', background: 'var(--card)', flexShrink: 0 }}>
            All
          </Link>
          {CATEGORIES.map(c => (
            <Link key={c} href={`/category/${c}`} style={{
              fontSize: '0.75rem',
              color: c === category ? 'var(--orange)' : 'var(--muted)',
              textDecoration: 'none', padding: '4px 12px', borderRadius: 20,
              border: `1px solid ${c === category ? 'var(--orange)' : 'var(--border)'}`,
              background: c === category ? 'rgba(255,87,34,0.08)' : 'var(--card)',
              flexShrink: 0,
            }}>
              {CATEGORY_META[c].icon} {CATEGORY_META[c].label}
            </Link>
          ))}
        </div>
      </div>

      {/* Code Grid */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', letterSpacing: 2 }}>
            {codes.length} <span style={{ color: 'var(--orange)' }}>{meta.label}</span> Codes
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Sorted by severity</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['high', 'med', 'low'] as Severity[]).map(sev => (
            <span key={sev} style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 20, background: `${SEV_HEX[sev]}15`, color: SEV_HEX[sev], border: `1px solid ${SEV_HEX[sev]}40` }}>
              ● {SEV_LABEL[sev]} ({codes.filter(c => c.sev === sev).length})
            </span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {codes.map(c => (
            <Link
              key={c.code}
              href={`/${c.code.toLowerCase()}`}
              style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', transition: 'border-color .2s, transform .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              <span style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: SEV_HEX[c.sev] }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 8 }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.55rem', letterSpacing: 2, color: 'var(--orange)' }}>{c.code}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '3px 9px', borderRadius: 20, background: `${SEV_HEX[c.sev]}22`, color: SEV_HEX[c.sev] }}>{SEV_LABEL[c.sev]}</span>
              </div>
              <div style={{ paddingLeft: 8 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6, lineHeight: 1.4 }}>{c.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55 }}>{c.desc ?? c.causes[0]}</div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{c.diy ? '✅ DIY' : '⚠️ Pro'} · {c.avg_cost}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--orange)', fontWeight: 600 }}>View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
