import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(4rem,12vw,8rem)', color: 'var(--orange)', letterSpacing: 4, lineHeight: 1 }}>
          404
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>Code Not Found</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 400, lineHeight: 1.7 }}>
          That OBD2 code isn&apos;t in our database yet. Try searching for it on the homepage.
        </p>
        <Link href="/" style={{ marginTop: '2rem', background: 'var(--orange)', color: 'white', textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 600 }}>
          ← Back to Code Lookup
        </Link>
      </div>
      <Footer />
    </>
  )
}
