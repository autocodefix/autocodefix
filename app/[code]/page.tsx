import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RelatedCodes from '@/components/RelatedCodes'
import AIDiagnosis from '@/components/AIDiagnosis'
import Breadcrumb from '@/components/Breadcrumb'
import { catLabel, sevLabel, sevHex, CATEGORY_META } from '@/lib/codes-db'
import { getCode, getAllCodes, getRelatedCodes } from '@/lib/db/dal'
import type { OBDCode } from '@/lib/codes-db'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://autocodefix.com'

export async function generateStaticParams() {
  return await getAllCodes()
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code: slug } = await params
  const c = await getCode(slug)
  if (!c) return {}

  const title = `${c.code} Code — ${c.name}`
  const description = `${c.desc ?? `Learn about OBD2 code ${c.code}: ${c.name}.`} Find causes, symptoms, and step-by-step repair solutions.`.slice(0, 155)
  const url = `${BASE}/${slug}`

  return {
    title,
    description,
    keywords: [c.code, `${c.code.toLowerCase()} code`, `obd2 ${c.code}`, c.name.toLowerCase(), `fix ${c.code}`, 'check engine light'],
    alternates: { canonical: url },
    openGraph: { title: `${c.code} — ${c.name}`, description, url, type: 'article' },
    twitter: { card: 'summary_large_image', title: `${c.code} — ${c.name}`, description },
  }
}

export default async function CodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code: slug } = await params
  const maybeCode = await getCode(slug)
  if (!maybeCode) notFound()

  // Cast is safe — notFound() throws, TypeScript just doesn't know it
  const c: OBDCode = maybeCode

  const related = await getRelatedCodes(c, 6)
  const url = `${BASE}/${slug}`
  const catL = catLabel(c.cat)
  const sevL = sevLabel(c.sev)
  const sevH = sevHex(c.sev)
  const desc = c.desc
    ?? `Learn about OBDtrouble code ${c.code}: ${c.name}. Find causes, symptoms, and step-by-step repair solutions.`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${c.code} — ${c.name}`,
    description: desc.slice(0, 200),
    url,
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'AUTO CODE FIX', url: BASE },
    publisher: {
      '@type': 'Organization', name: 'AUTO CODE FIX', url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
    articleSection: catL,
    keywords: `${c.code}, OBD2 ${c.code}, ${c.name}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: catL, item: `${BASE}/category/${c.cat}` },
      { '@type': 'ListItem', position: 3, name: c.code, item: url },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What does OBD2 code ${c.code} mean?`,
        acceptedAnswer: { '@type': 'Answer', text: `${c.code} means: ${c.name}. ${desc}` } },
      { '@type': 'Question', name: `What causes code ${c.code}?`,
        acceptedAnswer: { '@type': 'Answer', text: c.causes.join('; ') } },
      { '@type': 'Question', name: `How do I fix code ${c.code}?`,
        acceptedAnswer: { '@type': 'Answer', text: c.solutions.join('; ') } },
      { '@type': 'Question', name: `How much does it cost to fix ${c.code}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Estimated repair cost for ${c.code} is ${c.avg_cost}.` } },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Fix OBD2 Code ${c.code} — ${c.name}`,
    description: `Step-by-step repair guide for ${c.code}: ${c.name}`,
    totalTime: 'PT60M',
    step: c.solutions.map((step, i) => ({
      '@type': 'HowToStep', position: i + 1, name: `Step ${i + 1}`, text: step,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <Header />

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: catL, href: `/category/${c.cat}` },
        { label: c.code },
      ]} />

      {/* HERO */}
      <div style={{ padding: '3rem 2rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={badgePill}>{catL}</span>
          <span style={{ ...badgePill, background: `${sevH}22`, color: sevH, border: `1px solid ${sevH}44` }}>{sevL}</span>
          {c.diy
            ? <span style={{ ...badgePill, background: 'rgba(0,200,83,.12)', color: '#00C853', border: '1px solid rgba(0,200,83,.3)' }}>✅ DIY Friendly</span>
            : <span style={{ ...badgePill, background: 'rgba(255,87,34,.12)', color: 'var(--orange)', border: '1px solid rgba(255,87,34,.3)' }}>⚠️ Professional Recommended</span>
          }
        </div>

        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem,8vw,5.5rem)', letterSpacing: 4, color: 'var(--orange)', lineHeight: 1 }}>
          {c.code}
        </h1>
        <h2 style={{ fontSize: 'clamp(1rem,3vw,1.4rem)', fontWeight: 600, color: 'var(--text)', marginTop: '0.5rem', lineHeight: 1.4 }}>
          {c.name}
        </h2>
        <p style={{ color: '#bbb', fontSize: '1rem', lineHeight: 1.75, marginTop: '1.25rem', maxWidth: 760, paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          {desc}
        </p>

        {/* Quick facts */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '1.5rem 0' }}>
          {([
            ['Severity', sevL, sevH],
            ['Category', catL, 'var(--text)'],
            ['Est. Repair Cost', c.avg_cost, 'var(--orange)'],
            ['Code Type', c.code[0] === 'P' ? 'Powertrain' : c.code[0] === 'B' ? 'Body' : c.code[0] === 'C' ? 'Chassis' : 'Network', 'var(--text)'],
            ['DIY Repair', c.diy ? 'Yes' : 'Professional', c.diy ? '#00C853' : 'var(--orange)'],
          ] as [string, string, string][]).map(([label, val, color]) => (
            <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.6rem 1.1rem' }}>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color, marginTop: 2 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAUSES + SYMPTOMS + SOLUTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.5rem', maxWidth: 1000, margin: '0 auto 2rem', padding: '0 2rem' }}>
        <ContentCard title="⚡ Common Causes" items={c.causes} />
        <ContentCard title="⚠️ Symptoms" items={c.symptoms} />
        <div style={{ gridColumn: '1 / -1' }}>
          <ContentCard title="✅ How to Fix — Step by Step" items={c.solutions} numbered />
        </div>
      </div>

      {/* PRO TIP */}
      {c.tip && (
        <div style={{
          background: 'rgba(255,87,34,.06)', borderLeft: '4px solid var(--orange)',
          borderRadius: '0 12px 12px 0', padding: '1rem 1.25rem',
          maxWidth: 956, margin: '0 auto 2rem',
          fontSize: '0.9rem', color: '#ccc', lineHeight: 1.65,
        }}>
          💡 <strong style={{ color: 'var(--orange)' }}>Pro Tip:</strong> {c.tip}
        </div>
      )}

      {/* REPAIR COST */}
      <div style={{ maxWidth: 1000, margin: '0 auto 2rem', padding: '0 2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 2, marginBottom: '1.25rem' }}>
          Repair <span style={{ color: 'var(--orange)' }}>Cost Estimate</span>
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {([
            ['Full Repair Estimate', c.avg_cost],
            ['DIY Possible?', c.diy ? 'YES' : 'PRO'],
            ['Severity', sevL],
          ] as [string, string][]).map(([label, val]) => (
            <div key={label} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1rem 1.5rem', textAlign: 'center', flex: 1, minWidth: 140 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1.5 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 1, color: 'var(--orange)', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 1000, margin: '0 auto 2rem', padding: '0 2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 2, marginBottom: '1.25rem' }}>
          Frequently Asked <span style={{ color: 'var(--orange)' }}>Questions</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {([
            [`What does OBD2 code ${c.code} mean?`, `${c.code} stands for ${c.name}. ${desc}`],
            [`What causes code ${c.code}?`, c.causes.join('; ')],
            [`How do I fix code ${c.code}?`, c.solutions.join('; ')],
            [`How much does it cost to fix ${c.code}?`, `Estimated repair cost for ${c.code} is ${c.avg_cost}.`],
            [`Is ${c.code} DIY-friendly?`, c.diy
              ? `Yes — ${c.code} is generally DIY-friendly with basic tools.`
              : `${c.code} typically requires professional equipment and a qualified mechanic.`],
          ] as [string, string][]).map(([q, a]) => (
            <details key={q} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <summary style={{ padding: '1rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.92rem', color: 'var(--text)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {q}
                <span style={{ color: 'var(--orange)', fontSize: '1.2rem', flexShrink: 0, marginLeft: 12 }}>+</span>
              </summary>
              <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, borderTop: '1px solid var(--border)' }}>
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <AIDiagnosis code={c.code} name={c.name} />
      <RelatedCodes codes={related} currentCode={c.code} />
      <Footer />
    </>
  )
}

function ContentCard({ title, items, numbered }: { title: string; items: string[]; numbered?: boolean }) {
  return (
    <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
      <h3 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: 2, color: 'var(--orange)', marginBottom: '1rem', fontWeight: 700 }}>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ padding: '0.45rem 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none', fontSize: '0.9rem', color: '#ccc', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
            {numbered
              ? <strong style={{ color: 'var(--orange)', minWidth: 60, flexShrink: 0 }}>Step {i + 1}:</strong>
              : <span style={{ color: 'var(--orange)', fontSize: '1.1rem', flexShrink: 0, marginTop: -1 }}>›</span>
            }
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

const badgePill: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--dark3)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  fontSize: '0.72rem',
  color: 'var(--muted)',
  padding: '4px 12px',
  textTransform: 'uppercase',
  letterSpacing: 1,
}
