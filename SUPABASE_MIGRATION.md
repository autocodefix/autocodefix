# Migrating AUTO CODE FIX to Supabase

This guide takes you from the static TypeScript database (`codes-db.ts`) to a
live PostgreSQL database on Supabase in about 20 minutes.

---

## Why Supabase?

| Feature | Static TS | Supabase |
|---|---|---|
| Code count | ~116 (hardcoded) | Unlimited |
| Search | In-memory JS | Postgres full-text + trigrams |
| Add new codes | Edit code, redeploy | SQL INSERT or dashboard UI |
| Analytics / queries | None | Full SQL |
| Cost | Free | Free tier (500 MB, 50k rows) |

---

## Step 1 — Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click **New project**
3. Choose a name (e.g. `autocodefix`), region closest to your users, and a database password
4. Wait ~2 minutes for the project to be ready

---

## Step 2 — Run the schema migration

1. In your Supabase project, go to **SQL Editor**
2. Click **New query**
3. Paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** — you should see "Success. No rows returned"

This creates:
- `obd_codes` table with full-text search vector
- `category_stats` materialized view
- `search_obd_codes()` function
- Row Level Security (public read, server-only write)
- All indexes

---

## Step 3 — Seed the database

1. In SQL Editor, open a new query
2. Paste the contents of `supabase/migrations/002_seed_data.sql`
3. Click **Run** — it inserts all 116 codes and refreshes the stats view
4. Verify: run `select cat, count(*) from obd_codes group by cat order by cat;`

You should see something like:
```
abs         | 8
airbag      | 4
electrical  | 12
...
```

---

## Step 4 — Get your API keys

In your Supabase project:
1. Go to **Project Settings → API**
2. Copy **Project URL** → `SUPABASE_URL`
3. Copy **service_role** key (under "Project API Keys") → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ The `service_role` key bypasses Row Level Security. Keep it server-side only — never put it in client code or commit it to git.

---

## Step 5 — Configure environment variables

Create `.env.local` in your project root:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_BASE_URL=https://autocodefix.com
```

---

## Step 6 — Install the Supabase client

```bash
npm install
# or
npm install @supabase/supabase-js
```

---

## Step 7 — Test locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app will now query Supabase.
You can verify in the Supabase dashboard → **Table Editor → obd_codes**.

> **Fallback**: If `SUPABASE_URL` is not set, the app automatically falls back to the
> static `codes-db.ts`. So `npm run dev` always works even without `.env.local`.

---

## Step 8 — Deploy to Vercel (or any host)

Add the three environment variables in your hosting dashboard:

**Vercel:** Project Settings → Environment Variables:
- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_BASE_URL`

Then redeploy.

---

## Adding new codes (after migration)

### Option A: Supabase Dashboard

1. Go to **Table Editor → obd_codes**
2. Click **Insert row**
3. Fill in the fields
4. Save — the search vector updates automatically via trigger

### Option B: SQL

```sql
insert into obd_codes (code, name, cat, sev, description, causes, symptoms, solutions, diy, avg_cost, tip)
values (
  'P0456',
  'Evaporative Emission System Leak Detected (Very Small Leak)',
  'emissions',
  'low',
  'A very small leak has been detected in the EVAP system.',
  ARRAY['Loose or missing fuel cap', 'Cracked EVAP hose', 'Faulty purge valve'],
  ARRAY['Check engine light', 'Possible faint fuel smell', 'Fails emissions test'],
  ARRAY['Check and tighten fuel cap first', 'Inspect EVAP hoses', 'Test purge valve'],
  true,
  '$0–$300',
  'Start by tightening the fuel cap and driving a few days — this fixes ~40% of P0456 codes.'
);

-- Refresh stats (run after bulk inserts)
select refresh_category_stats();
```

### Option C: REST API (future admin panel)

You can build an admin page that calls Supabase directly using the service role key.

---

## Regenerating TypeScript types

After changing the schema, regenerate `lib/db/database.types.ts`:

```bash
npx supabase gen types typescript \
  --project-id your-project-id \
  > lib/db/database.types.ts
```

---

## Scaling beyond free tier

The Supabase free tier (500 MB database, 50k requests/day) handles a small-to-medium
site easily. When you need more:

- **Pro plan ($25/mo)** — 8 GB database, unlimited requests, daily backups
- **Connection pooling** — enable PgBouncer in Supabase for high traffic
- **Read replicas** — available on Pro+ for global low-latency reads

For a very high-traffic OBD site, consider:
1. Keeping `generateStaticParams` in Next.js (pre-renders all code pages at build time)
2. Only using Supabase for search, admin, and dynamic features
3. Setting up ISR (Incremental Static Regeneration) for category pages

---

## Architecture summary

```
Browser
  │
  ├─ Static pages (/p0300, /category/engine)
  │     └─ Pre-rendered at build time via dbGetAllSlugs() + dbGetCodesByCategory()
  │
  ├─ /api/search?q=...
  │     └─ dbSearchCodes() → Postgres search_obd_codes() function
  │
  └─ /api/diagnose + /api/chat
        └─ Anthropic Claude API (unchanged)

lib/db/queries.ts ←── all DB access
  │
  ├─ SUPABASE_URL set?  →  Supabase PostgreSQL
  └─ not set?           →  codes-db.ts (static fallback)
```
