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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="fb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#18ACFE"/><stop offset="100%" stopColor="#0163E0"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#fb2)"/><path d="M13.5 8.5H15V6H13C11.3 6 10 7.3 10 9v1.5H8.5V13H10v7h2.5v-7h2l.5-2.5h-2.5V9c0-.3.2-.5.5-.5z" fill="white"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#000"/><path d="M17.5 4h2.5l-5.5 6.3L21 20h-5l-3.5-4.6L8.5 20H6l5.8-6.6L3 4h5.1l3.2 4.2L17.5 4zm-.9 14.4h1.4L7.5 5.4H6l10.6 13z" fill="white"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><defs><radialGradient id="ig2" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#ig2)"/><rect x="6" y="6" width="12" height="12" rx="4" stroke="white" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none"/><circle cx="16.5" cy="7.5" r="1" fill="white"/></svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="#010101"/><path d="M16 6h-2v8.5c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8.8-1.8 1.8-1.8c.2 0 .3 0 .5.1V10.1c-.2 0-.3 0-.5 0-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.7 3.7-3.7V9.8c.7.4 1.6.7 2.5.7V8c-1.2 0-2.2-.8-2.4-2z" fill="white"/></svg>
              </a>
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