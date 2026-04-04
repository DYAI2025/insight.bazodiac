-- ═══════════════════════════════════════════════════════════════
-- BAZODIAC Investor Auth — Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

-- 1. Create the investor requests table
create table investor_requests (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  name        text,
  company     text,
  message     text,
  status      text not null default 'pending',
  created_at  timestamptz not null default now(),
  approved_at timestamptz
);

-- 2. Enable Row Level Security
alter table investor_requests enable row level security;

-- 3. Grant access to anon and authenticated roles
grant usage on schema public to anon, authenticated;
grant all on investor_requests to anon, authenticated;

-- 4. INSERT: anyone (anon or authenticated) can insert requests
create policy "public_insert" on investor_requests
  for insert
  to anon, authenticated
  with check (true);

-- 5. SELECT: authenticated user can read only their own row
create policy "own_row_select" on investor_requests
  for select
  to authenticated
  using (email = auth.jwt() ->> 'email');

-- ═══════════════════════════════════════════════════════════════
-- After running this SQL, configure Auth → URL Configuration:
--   Site URL:      https://dyai2025.github.io
--   Redirect URLs: https://dyai2025.github.io/insight.bazodiac/investor/dashboard.html
-- ═══════════════════════════════════════════════════════════════
