'use client'

import type { Metadata } from 'next'

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--dark)' }}>
      <div style={{ background: 'var(--dark2)', borderBottom: '1px solid var(--border)', padding: '5rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(255,87,34,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-block', background: 'rgba(255,87,34,0.12)', color: 'var(--orange)', border: '1px solid rgba(255,87,34,0.3)', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 16px', marginBottom: '1.5rem' }}>
          📬 Get In Touch
        </div>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem,8vw,6rem)', letterSpacing: 4, lineHeight: 1, color: 'var(--text)', marginBottom: '1rem' }}>
          CONTACT <span style={{ color: 'var(--orange)' }}>US</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Have a question about a fault code or need help with diagnostics? We&apos;re here to help.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 2, color: 'var(--text)', marginBottom: '0.5rem' }}>
            REACH <span style={{ color: 'var(--orange)' }}>OUT</span>
          </h2>

          <a href="mailto:admin@autocodefix.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: 'rgba(255,87,34,0.12)', border: '1px solid rgba(255,87,34,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>✉️</div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Email</div>
              <div style={{ color: 'var(--orange)', fontSize: '0.9rem', fontWeight: 600 }}>admin@autocodefix.com</div>
            </div>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: 'rgba(255,87,34,0.12)', border: '1px solid rgba(255,87,34,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>⏱️</div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>Response Time</div>
              <div style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 600 }}>Within 24 hours</div>
            </div>
          </div>

          <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '1rem' }}>Follow Us</div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { href: 'https://facebook.com', icon: '📘' },
                { href: 'https://x.com', icon: '🐦' },
                { href: 'https://instagram.com', icon: '📸' },
                { href: 'https://tiktok.com', icon: '🎵' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--dark3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', textDecoration: 'none' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,87,34,0.05)', border: '1px solid rgba(255,87,34,0.2)', borderRadius: 10, padding: '1rem', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>
            💡 For faster help, include your vehicle make, model, year, and the exact fault code when contacting us.
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: 2, color: 'var(--text)', marginBottom: '1.5rem' }}>
            SEND A <span style={{ color: 'var(--orange)' }}>MESSAGE</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Your Name', type: 'text', placeholder: 'John Smith' },
              { label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              { label: 'Subject', type: 'text', placeholder: 'e.g. Question about P0300 code' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>Message</label>
              <textarea placeholder="Describe your issue or question..." rows={5} style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <a href="mailto:admin@autocodefix.com" style={{ display: 'block', textAlign: 'center', background: 'var(--orange)', color: 'white', padding: '0.85rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              Send Message →
            </a>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', margin: 0 }}>
              We reply within 24 hours • admin@autocodefix.com
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}