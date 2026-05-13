-- ============================================================
-- AUTO CODE FIX — Supabase PostgreSQL Schema
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Enable pg_trgm for fast full-text / fuzzy search
create extension if not exists pg_trgm;

-- ── obd_codes table ─────────────────────────────────────────
create table if not exists public.obd_codes (
  id            bigint        generated always as identity primary key,
  code          text          not null unique,
  name          text          not null,
  cat           text          not null
    check (cat in ('engine','fuel','emissions','transmission','ignition',
                   'abs','airbag','hvac','electrical','network','sensors','exhaust')),
  sev           text          not null
    check (sev in ('high','med','low')),
  description   text,
  causes        text[]        not null default '{}',
  symptoms      text[]        not null default '{}',
  solutions     text[]        not null default '{}',
  diy           boolean       not null default false,
  avg_cost      text          not null default '$0',
  tip           text,
  img_url       text,
  video_url     text,
  -- Full-text search vector (auto-maintained via trigger)
  fts           tsvector
    generated always as (
      setweight(to_tsvector('english', coalesce(code,'')), 'A') ||
      setweight(to_tsvector('english', coalesce(name,'')), 'B') ||
      setweight(to_tsvector('english', coalesce(description,'')), 'C') ||
      setweight(to_tsvector('english', array_to_string(causes,' ')), 'D') ||
      setweight(to_tsvector('english', array_to_string(symptoms,' ')), 'D')
    ) stored,
  created_at    timestamptz   not null default now(),
  updated_at    timestamptz   not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────

-- Primary lookup by code slug (case-insensitive)
create index if not exists obd_codes_code_lower_idx
  on public.obd_codes (lower(code));

-- Category filter
create index if not exists obd_codes_cat_idx
  on public.obd_codes (cat);

-- Severity filter
create index if not exists obd_codes_sev_idx
  on public.obd_codes (sev);

-- Category + severity composite (used by category pages)
create index if not exists obd_codes_cat_sev_idx
  on public.obd_codes (cat, sev);

-- Full-text search via GIN
create index if not exists obd_codes_fts_idx
  on public.obd_codes using gin(fts);

-- Trigram index on code for prefix/fuzzy autocomplete
create index if not exists obd_codes_code_trgm_idx
  on public.obd_codes using gin(code gin_trgm_ops);

-- Trigram index on name for partial name search
create index if not exists obd_codes_name_trgm_idx
  on public.obd_codes using gin(name gin_trgm_ops);

-- ── updated_at trigger ────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger obd_codes_updated_at
  before update on public.obd_codes
  for each row execute procedure public.set_updated_at();

-- ── Row-Level Security ────────────────────────────────────────
alter table public.obd_codes enable row level security;

-- Public read: anyone can read all codes
create policy "Public read access"
  on public.obd_codes for select
  using (true);

-- Write access: only authenticated service role (your seed script / admin)
create policy "Service role write access"
  on public.obd_codes for all
  using (auth.role() = 'service_role');

-- ── Helper function: search with scoring ─────────────────────
-- Called by /api/search  (replaces in-memory searchCodes())
create or replace function public.search_obd_codes(
  query     text,
  max_rows  int  default 8
)
returns table (
  code        text,
  name        text,
  cat         text,
  sev         text,
  description text,
  score       float
)
language sql stable as $$
  select
    c.code,
    c.name,
    c.cat,
    c.sev,
    c.description,
    (
      -- Exact code match: top priority
      case when upper(c.code) = upper(query)                           then 100.0 else 0 end +
      -- Code starts with query
      case when upper(c.code) like upper(query) || '%'                 then  60.0 else 0 end +
      -- Code trigram similarity
      similarity(c.code, query) * 40 +
      -- FTS rank weighted by column
      ts_rank_cd(c.fts, plainto_tsquery('english', query), 32) * 30 +
      -- Name trigram similarity
      similarity(c.name, query) * 20
    ) as score
  from public.obd_codes c
  where
    upper(c.code) like upper(query) || '%'
    or c.code % query                          -- trigram threshold (pg_trgm)
    or c.fts @@ plainto_tsquery('english', query)
    or c.name ilike '%' || query || '%'
  order by score desc
  limit max_rows;
$$;

-- ── category_stats view ───────────────────────────────────────
create or replace view public.category_stats as
select
  cat,
  count(*)                              as total,
  count(*) filter (where sev = 'high') as high,
  count(*) filter (where sev = 'med')  as med,
  count(*) filter (where sev = 'low')  as low,
  count(*) filter (where diy = true)   as diy
from public.obd_codes
group by cat;

-- Grant read on the view to anon role too
grant select on public.category_stats to anon, authenticated;

-- ── Done ─────────────────────────────────────────────────────
-- After running this, run the seed script:
--   npx ts-node --project tsconfig.seed.json scripts/seed.ts
