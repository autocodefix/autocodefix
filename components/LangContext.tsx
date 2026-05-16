'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LangCode, isRTL } from '@/lib/i18n'
interface LangContextType { lang: LangCode; setLang: (l: LangCode) => void; rtl: boolean }
const LangContext = createContext<LangContextType>({ lang: 'en', setLang: () => {}, rtl: false })
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')
  useEffect(() => {
    const saved = localStorage.getItem('acf-lang') as LangCode | null
    if (saved) setLangState(saved)
  }, [])
  const setLang = (l: LangCode) => {
    setLangState(l)
    localStorage.setItem('acf-lang', l)
    document.documentElement.dir = isRTL(l) ? 'rtl' : 'ltr'
    document.documentElement.lang = l
  }
  useEffect(() => {
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang, rtl: isRTL(lang) }}>{children}</LangContext.Provider>
}
export function useLang() { return useContext(LangContext) }
