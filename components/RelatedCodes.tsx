"use client";
"use client";
"use client";
import Link from 'next/link'
import { OBDCode, sevHex } from '@/lib/codes-db'

interface Props {
  codes: OBDCode[]
  currentCode: string
}

export default function RelatedCodes({ codes, currentCode }: Props) {
  if (!codes.length) return null

  return (
    <section style={{ maxWidth: 1000, margin: '0 auto 3rem', padding: '0 2rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: '1.8rem',
        letterSpacing: 2,
        marginBottom: '1.25rem',
      }}>
        Related <span style={{ color: 'var(--orange)' }}>Codes</span>
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}>
        {codes.map(c => (
          <Link
            key={c.code}
            href={`/${c.code.toLowerCase()}`}
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1rem 1rem 1rem 1.3rem',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              position: 'relative',
              overflow: 'hidden',
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
            {/* Severity accent bar */}
            <span style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 4,
              height: '100%',
              background: sevHex(c.sev),
              borderRadius: '2px 0 0 2px',
            }} />

            <span style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '1.3rem',
              letterSpacing: 2,
              color: 'var(--orange)',
            }}>
              {c.code}
            </span>

            <span style={{
              fontSize: '0.78rem',
              color: 'var(--muted)',
              lineHeight: 1.4,
            }}>
              {c.name}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: sevHex(c.sev),
                background: `${sevHex(c.sev)}22`,
                padding: '2px 8px',
                borderRadius: 20,
              }}>
                {c.sev === 'high' ? 'Critical' : c.sev === 'med' ? 'Moderate' : 'Minor'}
              </span>
              {c.diy && (
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--green)',
                  background: 'rgba(0,200,83,0.12)',
                  padding: '2px 8px',
                  borderRadius: 20,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}>
                  DIY
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
