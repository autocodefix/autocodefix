import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/components/LangContext'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dm = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://autocodefix.com'),
  title: {
    default: 'AUTO CODE FIX — OBD2 Diagnostic Trouble Code Lookup',
    template: '%s | AUTO CODE FIX',
  },
  description: 'Free OBD2 diagnostic trouble code lookup. Search 2,600+ codes with causes, symptoms, repair guides, and cost estimates. Available in 7 languages.',
  keywords: ['OBD2 codes', 'OBD-II codes', 'check engine light', 'diagnostic trouble codes', 'DTC lookup', 'car fault codes', 'P0300', 'P0420', 'fault code lookup'],
  openGraph: {
    type: 'website',
    siteName: 'AUTO CODE FIX',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dm.variable}`}>
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}