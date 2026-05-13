# AUTO CODE FIX — Supabase Setup Guide

Move from static TypeScript files → real PostgreSQL in 4 steps.

---

## Step 1 — Create a Supabase project

1. Go to **https://supabase.com** → **New project**
2. Choose a region close to your users
3. Save your database password somewhere safe
4. Wait ~2 minutes for the project to provision

---

## Step 2 — Run the SQL schema

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Copy-paste the entire contents of **`scripts/001_schema.sql`**
3. Click **Run**

This creates:
- `obd_codes` table with all columns + constraints
- Full-text search vector (auto-maintained)
- 7 indexes (exact code, category, severity, FTS, trigram)
- `search_obd_codes()` PostgreSQL function (replaces in-memory search)
- `category_stats` view (live counts per category)
- Row-Level Security (public read, service-role write)

---

## Step 3 — Configure environment variables

```bash
# Copy the example file
cp .env.example .env.local

# Fill in your values from:
# Supabase Dashboard → Project Settings → API
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1N...
```

---

## Step 4 — Seed the database

```bash
npm install          # installs ts-node and dotenv
npm run seed         # loads all OBD codes into Supabase
```

Expected output:
```
🌱  Seeding 118 codes into Supabase…
✅  Batch 1–50   / 118 — 50 rows upserted
✅  Batch 51–100 / 118 — 50 rows upserted
✅  Batch 101–118 / 118 — 18 rows upserted

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total codes:   118
  Upserted:      118
  Errors:        0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉  Seed complete!
```

---

## Deploying to Vercel

Add these environment variables in **Vercel → Project → Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | Your project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `ANTHROPIC_API_KEY` | Your Anthropic key |
| `NEXT_PUBLIC_BASE_URL` | `https://autocodefix.com` |

---

## How the fallback works

The app never crashes without a database. The Data Access Layer (`lib/db/dal.ts`) checks:

```
SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set?
  YES → queries Supabase (PostgreSQL + full-text search)
  NO  → uses local codes-db.ts (static, instant, no DB needed)
```

So:
- **Local dev**: works with no config at all
- **Staging/preview**: uses static data unless you add env vars
- **Production**: uses Supabase with real full-text search

---

## Adding more codes later

**Via Supabase Dashboard (Table Editor):**
- Dashboard → Table Editor → `obd_codes` → Insert row

**Via SQL:**
```sql
INSERT INTO obd_codes (code, name, cat, sev, description, causes, symptoms, solutions, diy, avg_cost, tip)
VALUES (
  'P0456', 'Evaporative Emission System Leak Detected (Very Small Leak)',
  'emissions', 'low',
  'Very small EVAP system leak detected.',
  ARRAY['Loose or missing gas cap', 'Cracked EVAP hose', 'Failed purge valve'],
  ARRAY['Check engine light', 'Slight fuel odor'],
  ARRAY['Tighten gas cap', 'Inspect EVAP hoses', 'Replace purge valve'],
  true, '$0–$150', 'Start with the gas cap — it costs nothing to check.'
);
```

**Via the seed script (add to codes-db.ts, re-run):**
```bash
npm run seed    # upserts — won't duplicate existing codes
```

---

## Generating fresh TypeScript types

After changing the schema, regenerate `lib/db/types.ts`:

```bash
npx supabase login
npx supabase gen types typescript \
  --project-id your-project-id \
  > lib/db/types.ts
```

---

## Architecture overview

```
Browser / Next.js pages
        ↓
lib/db/dal.ts          ← ALL queries go through here
   ↙          ↘
Supabase      codes-db.ts
(production)  (local fallback)
```

Files added:
- `lib/db/client.ts`   — typed Supabase client singleton
- `lib/db/types.ts`    — TypeScript types matching schema
- `lib/db/dal.ts`      — Data Access Layer (all query functions)
- `scripts/001_schema.sql` — PostgreSQL schema
- `scripts/seed.ts`    — migration/seed script
- `tsconfig.seed.json` — TypeScript config for seed script
