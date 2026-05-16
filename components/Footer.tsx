"use client";
import Link from 'next/link';

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="fb-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18ACFE"/>
          <stop offset="100%" stopColor="#0163E0"/>
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#fb-grad)"/>
      <path d="M13.5 8.5H15V6H13C11.3 6 10 7.3 10 9v1.5H8.5V13H10v7h2.5v-7h2l.5-2.5h-2.5V9c0-.3.2-.5.5-.5z" fill="white"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M17.5 4h2.5l-5.5 6.3L21 20h-5l-3.5-4.6L8.5 20H6l5.8-6.6L3 4h5.1l3.2 4.2L17.5 4zm-.9 14.4h1.4L7.5 5.4H6l10.6 13z" fill="white"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-grad1" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad1)"/>
      <rect x="6" y="6" width="12" height="12" rx="4" stroke="white" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
      <circle cx="16.5" cy="7.5" r="1" fill="white"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#010101"/>
      <path d="M16 6h-2v8.5c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8.8-1.8 1.8-1.8c.2 0 .3 0 .5.1V10.1c-.2 0-.3 0-.5 0-2.1 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.7 3.7-3.7V9.8c.7.4 1.6.7 2.5.7V8c-1.2 0-2.2-.8-2.4-2z" fill="white"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
        <button style={{ width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #FF5722 0%, #FF8C42 50%, #FFB347 100%)', boxShadow: '0 4px 20px rgba(255,87,34,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 13c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.8-1.4 5.2-3.6 6.7l.3 1.8c.1.5-.4.9-.8.7L14 21c-.2 0-.3-.1-.4-.2C9.8 19.5 6 16.5 6 13z" fill="white"/>
            <circle cx="11" cy="13" r="1.3" fill="#FF5722"/>
            <circle cx="14" cy="13" r="1.3" fill="#FF5722"/>
            <circle cx="17" cy="13" r="1.3" fill="#FF5722"/>
          </svg>
        </button>
      </div>
      <footer style={{ background: 'var(--dark2)', borderTop: '1px solid var(--border)', padding: '2.5rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ flex: 2, minWidth: 200 }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', letterSpacing: 2, color: 'var(--orange)', marginBottom: '0.5rem' }}>
                ⚡ AUTO CODE FIX
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                The world&apos;s most comprehensive OBD2 fault code database — free, multilingual, and AI-powered.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}><FacebookIcon /></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}><XIcon /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}><InstagramIcon /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}><TikTokIcon /></a>
                <a href="mailto:admin@autocodefix.com" style={{ color: 'var(--orange)', textDecoration: 'none', fontSize: '0.82rem', marginLeft: '0.25rem' }}>✉️ admin@autocodefix.com</a>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'var(--text)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '0.75rem' }}>Quick Links</h4>
              {['/#cats|Categories', '/#results|All Codes', '/#about|About', '/#contact|Contact'].map(item => {
                const [href, label] = item.split('|')
                return <Link key={href} href={href} style={{ display: 'block', color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.4rem' }}>{label}</Link>
              })}
            </div>
            <div>
              <h4 style={{ color: 'var(--text)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '0.75rem' }}>Popular Codes</h4>
              {['P0300', 'P0420', 'P0171', 'P0442', 'P0011'].map(code => (
                <Link key={code} href={`/${code.toLowerCase()}`} style={{ display: 'block', color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.4rem' }}>{code}</Link>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.78rem' }}>
            <strong style={{ color: 'var(--orange)' }}>AUTO CODE FIX</strong> — Data is for reference only. Always consult a certified technician for safety-critical repairs.
          </div>
        </div>
      </footer>
    </>
  )
}