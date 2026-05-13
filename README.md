# AUTO CODE FIX — Next.js App

A full Next.js 15 application with:
- ✅ **Real SEO pages** — one static page per code (`/p0300`, `/p0420`, etc.) with full metadata
- ✅ **All 4 schema types** on every page — Article, Breadcrumb, FAQ, HowTo
- ✅ **Related codes system** — scored by category + keyword overlap + code family
- ✅ **Server-side API routes** — Anthropic API key stays secure on the server
- ✅ **Auto-generated sitemap.xml** and robots.txt
- ✅ **TypeScript** throughout
- ✅ **Next.js App Router** with Server Components for SEO, Client Components for interactivity

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key

# 3. Run development server
npm run dev
# → http://localhost:3000

# 4. Build for production
npm run build
npm run start
```

---

## Project Structure

```
autocodefix/
├── app/
│   ├── layout.tsx          ← Root layout (fonts, global metadata)
│   ├── page.tsx            ← Homepage (Server Component + schema)
│   ├── globals.css         ← Design tokens + Tailwind base
│   ├── sitemap.ts          ← Auto-generated sitemap.xml
│   ├── robots.ts           ← robots.txt
│   ├── not-found.tsx       ← 404 page
│   ├── [code]/
│   │   └── page.tsx        ← Individual code pages (SEO + all 4 schemas)
│   └── api/
│       ├── diagnose/route.ts  ← AI diagnosis endpoint (secure)
│       └── chat/route.ts      ← AI chat endpoint (secure)
├── components/
│   ├── Header.tsx          ← Sticky header
│   ├── Footer.tsx          ← Footer with links
│   ├── HomeClient.tsx      ← Interactive homepage (search, filter, grid)
│   ├── RelatedCodes.tsx    ← Related codes widget (scored relevance)
│   └── AIDiagnosis.tsx     ← AI diagnosis button + result panel
└── lib/
    └── codes-db.ts         ← Master code database + helper functions
```

---

## Adding More Codes

Edit `lib/codes-db.ts` and add entries to the `CODES` array:

```typescript
{ 
  code: 'P0123', 
  name: 'Throttle/Pedal Position Sensor High Input',
  cat: 'sensors',
  sev: 'high',
  causes: ['Faulty TPS sensor', 'Wiring short to voltage', ...],
  symptoms: ['Check engine light', 'Stalling', ...],
  solutions: ['Inspect TPS wiring', 'Replace TPS sensor', ...],
  diy: true, 
  avg_cost: '$50–$200',
  tip: 'Check connector pins for corrosion before replacing the sensor.'
}
```

Next.js will automatically:
1. Generate a `/p0123` page with full SEO metadata
2. Add it to `sitemap.xml`
3. Include it in the related codes algorithm
4. Include it in search results on the homepage

---

## Related Codes Algorithm

The `getRelatedCodes()` function in `lib/codes-db.ts` scores codes by:

| Signal | Points |
|--------|--------|
| Same category (e.g. both `engine`) | +10 |
| Same code family prefix (P030x) | +5 |
| Same code letter (P/B/C/U) | +2 |
| Same severity | +1 |
| Keyword overlap in code name | +3 per word |

Returns top 6 most relevant codes per page.

---

## Schema Markup (All 4 Types — Every Code Page)

Each `/[code]` page outputs 4 JSON-LD blocks:

1. **TechArticle** — author, publisher, headline, dateModified
2. **BreadcrumbList** — Home → Category → Code
3. **FAQPage** — 5 Q&As per code (what it means, causes, fix, cost, DIY?)
4. **HowTo** — step-by-step repair guide with cost estimate

Validate at: https://search.google.com/test/rich-results

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key (server-side only) |
| `NEXT_PUBLIC_BASE_URL` | Yes | Your production URL (e.g. `https://autocodefix.com`) |

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
# Add environment variables in Vercel dashboard
```

### Netlify
```bash
npm run build
# Deploy the .next/standalone directory
```

### Self-hosted (VPS)
```bash
npm run build
npm run start
# Use PM2 or systemd to keep it running
```

After deploying, submit your sitemap to Google Search Console:
`https://autocodefix.com/sitemap.xml`
