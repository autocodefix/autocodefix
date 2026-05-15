"use client";

import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      background: 'var(--dark2)',
      borderBottom: '2px solid var(--orange)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: '1.9rem',
        letterSpacing: 3,
        color: 'var(--orange)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        ⚡ AUTO CODE FIX
      </Link>

      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/category" style={navLink}>Categories</Link>
        <Link href="/#results" style={navLink}>All Codes</Link>
        <Link href="/#about" style={navLink}>About</Link>
        <Link href="/#contact" style={navLink}>Contact</Link>
        <Link href="/" style={{ ...navLink, ...navCta }}>🔍 Lookup</Link>
      </nav>
    </header>
  )
}

const navLink: React.CSSProperties = {
  color: 'var(--muted)',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  transition: 'color .2s',
}

const navCta: React.CSSProperties = {
  background: 'var(--orange)',
  color: 'white',
  padding: '6px 16px',
  borderRadius: 20,
}
