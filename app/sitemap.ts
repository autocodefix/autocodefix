import { MetadataRoute } from 'next'
import { CODES, CATEGORY_META, Category } from '@/lib/codes-db'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://autocodefix.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const codePages = CODES.map(c => ({
    url: `${BASE}/${c.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryPages = (Object.keys(CATEGORY_META) as Category[]).map(cat => ({
    url: `${BASE}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/category`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...categoryPages,
    ...codePages,
  ]
}