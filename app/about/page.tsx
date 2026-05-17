import BackButton from '@/components/BackButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | AUTO CODE FIX',
  description: 'Learn about AUTO CODE FIX — built by an Automotive Engineer with over 10 years of hands-on experience in vehicle diagnostics and repair.',
}

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)' }}>

      {/* HERO */}
      <div style={{
        background: 'var(--dark2)',
        borderBottom: '1px solid var(--border)',
        padding: '5rem 2rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(255,87,34,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          display: 'inline-block', background: 'rgba(255,87,34,0.12)', color: 'var(--orange)',
          border: '1px solid rgba(255,87,34,0.3)', borderRadius: 20,
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: 2,
          textTransform: 'uppercase', padding: '5px 16px', marginBottom: '1.5rem',
        }}>
          🔧 Our Story
        </div>
        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(3rem,8vw,6rem)',
          letterSpacing: 4, lineHeight: 1, color: 'var(--text)',
          marginBottom: '1rem',
        }}>
          ABOUT <span style={{ color: 'var(--orange)' }}>AUTO CODE FIX</span>
        </h1>
        <p style={{
          color: 'var(--muted)', fontSize: '1.05rem',
          maxWidth: 540, margin: '0 auto', lineHeight: 1.7,
        }}>
          Built by an engineer who has spent over 10 years under the hood — making diagnostics simple for everyone.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 2rem 0' }}><BackButton /></div>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Intro card */}
        <div style={{
          background: 'var(--card)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '2.5rem',
          marginBottom: '2rem', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 4, height: '100%',
            background: 'linear-gradient(180deg, #FF5722, #FFB347)',
          }} />
          <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.85, margin: 0 }}>
            Welcome to <strong style={{ color: 'var(--orange)' }}>AUTO CODE FIX</strong> — your trusted source for automotive diagnostics, OBD-II trouble codes, vehicle repair guidance, and professional troubleshooting solutions.
          </p>
        </div>

        {/* Engineer section */}
        <div style={{
          background: 'var(--card)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '2.5rem',
          marginBottom: '2rem',
          display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap',
        }}>
          {/* Icon */}
          <div style={{
            width: 90, height: 90, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(255,87,34,0.2), rgba(255,87,34,0.05))',
            border: '2px solid rgba(255,87,34,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
          }}>
            👨‍🔧
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{
              fontFamily: 'var(--font-bebas)', fontSize: '1.8rem',
              letterSpacing: 2, color: 'var(--text)', marginBottom: '0.75rem',
            }}>
              THE <span style={{ color: 'var(--orange)' }}>ENGINEER</span> BEHIND IT
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              I am an Automotive Engineer with hands-on experience in the automotive industry with over <strong style={{ color: 'var(--text)' }}>10 years of experience</strong>. Over the years, I have worked with different vehicle systems, diagnostic tools, and repair processes — helping identify and solve complex automotive problems that leave others puzzled.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div style={{
          background: 'var(--card)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '2.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-bebas)', fontSize: '1.8rem',
            letterSpacing: 2, color: 'var(--text)', marginBottom: '1.25rem',
          }}>
            WHAT WE <span style={{ color: 'var(--orange)' }}>COVER</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            AUTO CODE FIX was created to help car owners, technicians, and automotive enthusiasts better understand:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { icon: '🔍', text: 'OBD-II Diagnostic Trouble Codes (DTCs)' },
              { icon: '⚙️', text: 'Engine and transmission problems' },
              { icon: '⚡', text: 'Electrical and sensor faults' },
              { icon: '💡', text: 'Check Engine Light issues' },
              { icon: '🔧', text: 'Possible causes and repair solutions' },
              { icon: '💰', text: 'Cost estimates for repairs' },
              { icon: '📋', text: 'Vehicle diagnostics and troubleshooting guides' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,87,34,0.04)',
                border: '1px solid rgba(255,87,34,0.15)',
                borderRadius: 10, padding: '0.85rem 1rem',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <span style={{ color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.4 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission statement */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,87,34,0.08), rgba(255,87,34,0.03))',
          border: '1.5px solid rgba(255,87,34,0.25)',
          borderRadius: 'var(--radius)', padding: '2.5rem',
          marginBottom: '2rem', textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
          <h2 style={{
            fontFamily: 'var(--font-bebas)', fontSize: '1.8rem',
            letterSpacing: 2, color: 'var(--orange)', marginBottom: '1rem',
          }}>
            OUR MISSION
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.85, maxWidth: 620, margin: '0 auto' }}>
            My mission is to make automotive diagnostics <strong style={{ color: 'var(--text)' }}>easier and more understandable</strong> by providing clear explanations, practical solutions, and reliable technical information based on real industry experience.
          </p>
        </div>

        {/* Who it's for */}
        <div style={{
          background: 'var(--card)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '2.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-bebas)', fontSize: '1.8rem',
            letterSpacing: 2, color: 'var(--text)', marginBottom: '1.25rem',
          }}>
            WHO IS IT <span style={{ color: 'var(--orange)' }}>FOR?</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { icon: '🚗', title: 'Car Owners', desc: 'Understand your warning lights and fix issues before they become expensive.' },
              { icon: '🔧', title: 'Technicians', desc: 'Quick reference for DTCs, causes, and professional repair guidance.' },
              { icon: '📚', title: 'Enthusiasts', desc: 'Deep-dive into vehicle systems and expand your automotive knowledge.' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: 1, minWidth: 180,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                borderRadius: 10, padding: '1.25rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.1rem', letterSpacing: 1, color: 'var(--orange)', marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Thank you */}
        <div style={{
          textAlign: 'center', padding: '2rem',
          color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.85,
        }}>
          <p>
            Whether you are a beginner, car owner, or professional technician, <strong style={{ color: 'var(--orange)' }}>AUTO CODE FIX</strong> aims to provide helpful automotive knowledge that saves time, reduces confusion, and supports better vehicle maintenance and repair decisions.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Thank you for visiting AUTO CODE FIX and being part of this automotive journey. 🙏
          </p>
        </div>

      </div>
    </main>
  )
}