'use client'

import Link from 'next/link'
import LangSwitcher from '@/components/LangSwitcher'
import { useLang } from '@/components/LangContext'
import { t } from '@/lib/i18n'

export default function Header() {
  const { lang } = useLang()

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
      flexWrap: 'wrap',
      gap: '0.5rem',
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/category" style={navLink}>{t(lang, 'categories')}</Link>
          <Link href="/#results" style={navLink}>{t(lang, 'allCodes')}</Link>
          <Link href="/about" style={navLink}>{t(lang, 'about')}</Link>
          <Link href="/#contact" style={navLink}>{t(lang, 'contact')}</Link>
          <Link href="/" style={{ ...navLink, ...navCta }}>{t(lang, 'lookup')}</Link>
        </nav>
        <LangSwitcher />
      </div>
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