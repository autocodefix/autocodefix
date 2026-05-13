import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark2)',
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 2rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', letterSpacing: 2, color: 'var(--orange)', marginBottom: '0.5rem' }}>
              ⚡ AUTO CODE FIX
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>
              The world&apos;s most comprehensive OBD2 fault code database — free, multilingual, and AI-powered.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '0.75rem' }}>Quick Links</h4>
            {['/#cats|Categories', '/#results|All Codes', '/#about|About', '/#contact|Contact'].map(item => {
              const [href, label] = item.split('|')
              return (
                <Link key={href} href={href} style={{ display: 'block', color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.4rem' }}>
                  {label}
                </Link>
              )
            })}
          </div>
          <div>
            <h4 style={{ color: 'var(--text)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '0.75rem' }}>Popular Codes</h4>
            {['P0300', 'P0420', 'P0171', 'P0442', 'P0011'].map(code => (
              <Link key={code} href={`/${code.toLowerCase()}`} style={{ display: 'block', color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.4rem' }}>
                {code}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.78rem' }}>
          <strong style={{ color: 'var(--orange)' }}>AUTO CODE FIX</strong> — Data is for reference only. Always consult a certified technician for safety-critical repairs.
        </div>
      </div>
    </footer>
  )
}
