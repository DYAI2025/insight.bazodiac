# Investor Auth Gate — Supabase Magic Link + Database

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Protect all 6 investor subpages behind a Supabase-backed login that only works after admin approval of the registration request.

**Architecture:** Pure frontend (GitHub Pages stays static). Supabase handles Postgres DB + Magic Link auth via browser SDK loaded from ESM CDN — no build step, no Node.js. Registration form on `index.html` inserts a row with `status='pending'`. Founder approves in Supabase Dashboard → `status='approved'`. User receives magic link email → clicks → session established → `auth-guard.js` checks session + approved status on every protected page. Unapproved or unauthenticated users are redirected.

**Tech Stack:** Supabase JS SDK v2 (ESM CDN), vanilla JS ES modules, GitHub Pages, Supabase Postgres + Auth

---

## Pre-Flight: Supabase Setup (Manual — 10 minutes)

These steps cannot be automated — must be done in the Supabase dashboard before coding begins.

**Step 1: Create Supabase project**
1. Go to https://supabase.com → New Project
2. Name: `bazodiac-investor`
3. Region: `eu-central-1` (Frankfurt — DACH audience)
4. Copy: `Project URL` and `anon public key`

**Step 2: Create DB table**

In Supabase → SQL Editor, run:

```sql
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

-- RLS: enable so anon can only insert, not read others
alter table investor_requests enable row level security;

-- Policy: anyone can insert their own request
create policy "insert own request" on investor_requests
  for insert with check (true);

-- Policy: user can read only their own row (by email)
create policy "read own request" on investor_requests
  for select using (email = auth.jwt() ->> 'email');

-- Policy: service_role can do everything (for admin approval)
```

**Step 3: Configure Auth**

In Supabase → Auth → Settings:
- Enable "Email" provider: ✅
- Disable "Confirm email" (magic link handles it): ✅
- Set Site URL: `https://dyai2025.github.io`
- Add redirect URL: `https://dyai2025.github.io/insight.bazodiac/investor/dashboard.html`
- Email template for Magic Link: customize subject to "BAZODIAC — Your Investor Access"

**Step 4: Save keys to `.env`**

```bash
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Task 1: Create `supabase-config.js` — SDK Init Module

**Files:**
- Create: `supabase-config.js`

**Step 1: Create the config file**

```js
// supabase-config.js
// Supabase client — imported by all auth-aware pages
// Keys are public (anon) — safe to ship in frontend code.
// Service role key NEVER goes here.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

Replace `YOUR_PROJECT` and `YOUR_ANON_KEY` with values from `.env`.

**Step 2: Verify the import works in browser**

Open Chrome DevTools console on any local HTML file and run:
```js
import { supabase } from './supabase-config.js'
console.log(supabase)
```
Expected: Supabase client object printed, no 401/404 errors.

**Step 3: Commit**

```bash
git add supabase-config.js
git commit -m "feat(auth): add Supabase client config module"
```

---

## Task 2: Update `index.html` — Wire Registration Form to Supabase

**Files:**
- Modify: `index.html` (the `#ask` section + hero "For Investors" link)

**Context:** The current form does `event.preventDefault()` and shows a hardcoded confirmation div. It inserts nothing into any database. The `investor-dossier` section links to the now-protected subpages.

**Step 1: Replace the form in the `#ask` section**

Find the `<form id="investor-form"...>` block and replace entirely with:

```html
<form id="investor-form" class="flex flex-col gap-4 max-w-md mx-auto reveal-up" novalidate>
    <div class="grid grid-cols-2 gap-4">
        <input
            id="req-name"
            type="text"
            placeholder="Full name"
            required
            class="bg-white/5 border border-[#D4AF37]/20 px-6 py-4 text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all text-[#D4AF37] col-span-2"
            style="min-height:44px"
        >
        <input
            id="req-company"
            type="text"
            placeholder="Company / Fund (optional)"
            class="bg-white/5 border border-[#D4AF37]/20 px-6 py-4 text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all text-[#D4AF37] col-span-2"
            style="min-height:44px"
        >
        <input
            id="req-email"
            type="email"
            placeholder="your@email.com"
            required
            class="bg-white/5 border border-[#D4AF37]/20 px-6 py-4 text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all text-[#D4AF37] col-span-2"
            style="min-height:44px"
        >
        <textarea
            id="req-message"
            placeholder="Brief note — why you're interested (optional)"
            rows="3"
            class="bg-white/5 border border-[#D4AF37]/20 px-6 py-4 text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all text-[#D4AF37] col-span-2 resize-none"
        ></textarea>
    </div>
    <button
        type="submit"
        id="req-submit"
        class="btn-primary bg-[#D4AF37] !text-[#05070a] font-bold interactive"
        style="min-height:44px"
    >
        Request Investor Access
    </button>
    <p id="req-error" class="text-red-400/70 text-xs text-center hidden"></p>
</form>

<div id="form-confirm" class="hidden text-center">
    <p class="text-[#D4AF37] text-sm tracking-widest mb-4">✓ REQUEST RECEIVED</p>
    <p class="text-xs text-white/40 max-w-sm mx-auto">We review requests manually and respond within 48 hours. You'll receive a secure access link by email once approved.</p>
</div>

<script type="module">
import { supabase } from './supabase-config.js'

document.getElementById('investor-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const btn = document.getElementById('req-submit')
    const errEl = document.getElementById('req-error')
    const email = document.getElementById('req-email').value.trim()
    const name = document.getElementById('req-name').value.trim()
    const company = document.getElementById('req-company').value.trim()
    const message = document.getElementById('req-message').value.trim()

    if (!email || !name) {
        errEl.textContent = 'Name and email are required.'
        errEl.classList.remove('hidden')
        return
    }

    btn.disabled = true
    btn.textContent = 'Sending...'
    errEl.classList.add('hidden')

    const { error } = await supabase
        .from('investor_requests')
        .insert({ email, name, company, message })

    if (error) {
        // Duplicate email = already requested
        if (error.code === '23505') {
            errEl.textContent = 'This email has already requested access. Check your inbox or contact us directly.'
        } else {
            errEl.textContent = 'Something went wrong. Please try again or email us directly.'
            console.error(error)
        }
        errEl.classList.remove('hidden')
        btn.disabled = false
        btn.textContent = 'Request Investor Access'
        return
    }

    // Success
    document.getElementById('investor-form').classList.add('hidden')
    document.getElementById('form-confirm').classList.remove('hidden')
})
</script>
```

**Step 2: Update the `investor-dossier` section card links**

All 6 cards in the `investor-dossier` section currently link to e.g. `architecture.html`. Update all hrefs to point to `investor/architecture.html` etc.

Find and replace all occurrences:
- `href="architecture.html"` → `href="investor/architecture.html"`
- `href="engine.html"` → `href="investor/engine.html"`
- `href="formula.html"` → `href="investor/formula.html"`
- `href="audience.html"` → `href="investor/audience.html"`
- `href="transparency.html"` → `href="investor/transparency.html"`
- `href="competition.html"` → `href="investor/competition.html"`

**Step 3: Manual test — form submission**

1. Open `index.html` in browser
2. Fill name + email + submit
3. Open Supabase Dashboard → Table Editor → `investor_requests`
4. Verify new row appears with `status='pending'`

Expected row:
```
id: <uuid>  email: test@test.com  name: Test  status: pending  created_at: <now>
```

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat(auth): wire registration form to Supabase investor_requests table"
```

---

## Task 3: Create `login.html` — Magic Link Login Page

**Files:**
- Create: `login.html`

**Context:** After admin approves a request in Supabase Dashboard, they trigger a magic link to the investor's email (see Task 6 — Admin Flow). The investor clicks the link, lands back at the site with a session token in the URL hash. This page handles that token exchange and also lets approved investors manually request a new magic link if their session expired.

**Step 1: Create `login.html`**

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>BAZODIAC — Investor Access</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen flex items-center justify-center px-6">
    <div class="film-grain"></div>
    <div id="nebula-lens" class="nebula-lens" style="left:50%;top:50%"></div>

    <div class="relative z-10 w-full max-w-md text-center">

        <!-- Logo -->
        <h1 class="gold-leaf-text text-3xl font-extralight tracking-[0.5em] mb-2">BAZODIAC</h1>
        <p class="tech-label text-white/30 mb-16">Investor Access Portal</p>

        <!-- State: checking session -->
        <div id="state-checking" class="space-y-4">
            <p class="text-white/40 text-sm">Verifying session...</p>
        </div>

        <!-- State: login form (for expired sessions) -->
        <div id="state-login" class="hidden space-y-6">
            <p class="text-white/50 text-sm mb-8">Enter your approved email to receive a new access link.</p>
            <div class="flex flex-col gap-4">
                <input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    class="bg-white/5 border border-[#D4AF37]/20 px-8 py-4 text-sm tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all text-[#D4AF37] w-full"
                    style="min-height:44px"
                >
                <button
                    id="login-btn"
                    class="btn-primary bg-[#D4AF37] !text-[#05070a] font-bold w-full"
                    style="min-height:44px"
                >
                    Send Access Link
                </button>
                <p id="login-error" class="text-red-400/70 text-xs hidden"></p>
            </div>
        </div>

        <!-- State: magic link sent -->
        <div id="state-sent" class="hidden space-y-4">
            <p class="text-[#D4AF37] text-sm tracking-widest">✓ ACCESS LINK SENT</p>
            <p class="text-white/40 text-xs">Check your inbox. The link expires in 1 hour.</p>
        </div>

        <!-- State: not approved -->
        <div id="state-pending" class="hidden space-y-4">
            <p class="text-white/50 text-sm">Your request is pending review.</p>
            <p class="text-white/30 text-xs">We'll email you once your access is approved. This usually takes less than 48 hours.</p>
            <a href="index.html" class="tech-label text-white/20 hover:text-[#D4AF37] transition-all block mt-8">← Back to main page</a>
        </div>

        <!-- State: session active → redirect -->
        <div id="state-redirecting" class="hidden">
            <p class="text-[#D4AF37]/60 text-sm">Access confirmed. Redirecting...</p>
        </div>

    </div>

    <style>
        .btn-primary {
            border: 1px solid var(--gold-primary, #D4AF37);
            color: var(--gold-primary, #D4AF37);
            padding: 14px 44px;
            letter-spacing: 0.2em;
            font-size: 11px;
            text-transform: uppercase;
            background: transparent;
            transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
        }
        .btn-primary:hover {
            background: var(--gold-primary, #D4AF37);
            color: #05070a;
        }
    </style>

    <script type="module">
    import { supabase } from './supabase-config.js'

    const states = ['checking', 'login', 'sent', 'pending', 'redirecting']
    const show = (name) => states.forEach(s =>
        document.getElementById(`state-${s}`).classList.toggle('hidden', s !== name)
    )

    // Where to go after successful login
    const params = new URLSearchParams(location.search)
    const next = params.get('next') || './investor/dashboard.html'

    async function init() {
        // Step 1: handle magic link callback (token in URL hash)
        const { data: { session }, error } = await supabase.auth.getSession()

        if (session) {
            // Already have a session — check if approved
            await checkApprovedAndRedirect(session, next)
            return
        }

        // Check URL for auth tokens from magic link click
        const hashParams = new URLSearchParams(location.hash.replace('#', ''))
        const accessToken = hashParams.get('access_token')

        if (accessToken) {
            // Exchange token from magic link
            const { data, error: sessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: hashParams.get('refresh_token') || ''
            })
            if (data?.session) {
                await checkApprovedAndRedirect(data.session, next)
                return
            }
        }

        // No session → show login form
        show('login')
    }

    async function checkApprovedAndRedirect(session, next) {
        show('redirecting')

        // Check investor_requests for approved status
        const { data, error } = await supabase
            .from('investor_requests')
            .select('status')
            .eq('email', session.user.email)
            .single()

        if (error || !data) {
            // Email not in requests table (registered via auth but no request)
            await supabase.auth.signOut()
            show('login')
            return
        }

        if (data.status !== 'approved') {
            show('pending')
            return
        }

        // Approved! Redirect
        window.location.href = next
    }

    // Send magic link
    document.getElementById('login-btn').addEventListener('click', async () => {
        const email = document.getElementById('login-email').value.trim()
        const errEl = document.getElementById('login-error')
        const btn = document.getElementById('login-btn')

        if (!email) {
            errEl.textContent = 'Please enter your email.'
            errEl.classList.remove('hidden')
            return
        }

        btn.disabled = true
        btn.textContent = 'Sending...'
        errEl.classList.add('hidden')

        // First check if email is in our approved list
        const { data: req } = await supabase
            .from('investor_requests')
            .select('status')
            .eq('email', email)
            .single()

        if (!req) {
            errEl.textContent = 'This email has not requested access. Please submit a request on the main page.'
            errEl.classList.remove('hidden')
            btn.disabled = false
            btn.textContent = 'Send Access Link'
            return
        }

        if (req.status !== 'approved') {
            show('pending')
            return
        }

        // Approved — send magic link
        const redirectTo = `${location.origin}${location.pathname.replace('login.html', '')}investor/dashboard.html`
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: redirectTo }
        })

        if (error) {
            errEl.textContent = 'Failed to send link. Try again.'
            errEl.classList.remove('hidden')
            btn.disabled = false
            btn.textContent = 'Send Access Link'
            return
        }

        show('sent')
    })

    init()
    </script>
</body>
</html>
```

**Step 2: Test magic link flow manually**

1. In Supabase Dashboard → Table Editor → `investor_requests`
2. Update one test row: `status` = `approved`
3. Open `login.html` in browser
4. Enter the approved email → click Send
5. Check inbox → click magic link
6. Should land on `investor/dashboard.html` (which doesn't exist yet — 404 is fine here)

**Step 3: Commit**

```bash
git add login.html
git commit -m "feat(auth): add investor login page with magic link + pending state"
```

---

## Task 4: Create `auth-guard.js` — Session Check for All Protected Pages

**Files:**
- Create: `investor/auth-guard.js`

**Context:** Every protected investor subpage must import this module at the top of its `<script type="module">`. It runs before rendering, checks for a valid session, checks approved status, and either allows rendering or redirects.

**Step 1: Create `investor/` directory and `auth-guard.js`**

```bash
mkdir -p investor
```

```js
// investor/auth-guard.js
// Import this in every protected page:
//   <script type="module">
//     import { requireApprovedSession } from '../investor/auth-guard.js'
//     await requireApprovedSession()
//     // ... rest of page JS
//   </script>

import { supabase } from '../supabase-config.js'

export async function requireApprovedSession() {
    // 1. Handle magic link token in URL (first page load after clicking email link)
    const hashParams = new URLSearchParams(location.hash.replace('#', ''))
    const accessToken = hashParams.get('access_token')
    if (accessToken) {
        await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get('refresh_token') || ''
        })
        // Clean the URL hash
        history.replaceState(null, '', location.pathname + location.search)
    }

    // 2. Get current session
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        // No session → redirect to login
        const next = encodeURIComponent(location.pathname)
        window.location.replace(`../login.html?next=${next}`)
        // Throw to stop any further JS execution
        throw new Error('REDIRECT')
    }

    // 3. Check approved status
    const { data: req } = await supabase
        .from('investor_requests')
        .select('status')
        .eq('email', session.user.email)
        .single()

    if (!req || req.status !== 'approved') {
        // Session valid but not approved → pending screen
        window.location.replace(`../login.html?next=${encodeURIComponent(location.pathname)}`)
        throw new Error('REDIRECT')
    }

    // 4. Expose user info for the page to use
    return {
        email: session.user.email,
        session
    }
}

export async function signOut() {
    await supabase.auth.signOut()
    window.location.replace('../index.html')
}
```

**Step 2: Commit**

```bash
git add investor/auth-guard.js
git commit -m "feat(auth): add auth-guard module for protected investor pages"
```

---

## Task 5: Create `investor/dashboard.html` + Move All Subpages

**Files:**
- Create: `investor/dashboard.html`
- Move: `architecture.html` → `investor/architecture.html`
- Move: `engine.html` → `investor/engine.html`
- Move: `formula.html` → `investor/formula.html`
- Move: `audience.html` → `investor/audience.html`
- Move: `transparency.html` → `investor/transparency.html`
- Move: `competition.html` → `investor/competition.html`
- Modify: Each moved file — add auth-guard, fix relative paths

**Step 1: Create the dashboard**

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>BAZODIAC — Investor Dashboard</title>
    <link rel="stylesheet" href="../investor.css">
</head>
<body>
    <div class="film-grain"></div>
    <div class="vignette" id="vignette"></div>
    <div id="nebula-lens" class="nebula-lens"></div>
    <div id="custom-cursor" class="custom-cursor"></div>
    <div id="cursor-ring" class="cursor-ring"></div>

    <header class="topbar">
        <div class="topbar-inner">
            <a class="brand" href="../index.html">← BAZODIAC</a>
            <nav class="topnav">
                <a href="architecture.html">Architecture</a>
                <a href="engine.html">Engine</a>
                <a href="formula.html">Formula</a>
                <a href="audience.html">Audience</a>
                <a href="transparency.html">Transparency</a>
                <a href="competition.html">Competition</a>
                <button id="logout-btn" style="background:none;border:none;color:rgba(255,255,255,0.3);font-size:10px;letter-spacing:0.3em;text-transform:uppercase;cursor:pointer">Sign Out</button>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero-panel">
            <div class="page-shell">
                <div class="reveal-up" style="max-width:640px">
                    <span class="tech-label kicker">Investor Portal</span>
                    <h1 class="gold-leaf-text text-4xl md:text-5xl">Investor Dossier</h1>
                    <p id="welcome-msg" style="margin-top:1.5rem;color:rgba(255,255,255,0.5)">Six deep dives into the BAZODIAC signal. You're viewing confidential pre-investment materials.</p>
                </div>
            </div>
        </section>

        <section class="content-block">
            <div class="page-shell">
                <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" style="display:grid">
                    <a href="architecture.html" class="glass-card reveal-up" style="padding:2rem;display:block;text-decoration:none;transition:transform 0.3s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
                        <div class="tech-label kicker">01 · Architecture</div>
                        <h3 class="gold-leaf-text" style="font-size:1rem;letter-spacing:0.2em;margin:0.5rem 0">SYSTEM STACK</h3>
                        <p style="font-size:0.8rem;color:rgba(255,255,255,0.45)">How Bazodiac turns birth data into a deterministic fusion output.</p>
                    </a>
                    <a href="engine.html" class="glass-card reveal-up" style="padding:2rem;display:block;text-decoration:none;transition:transform 0.3s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
                        <div class="tech-label kicker">02 · Engine</div>
                        <h3 class="gold-leaf-text" style="font-size:1rem;letter-spacing:0.2em;margin:0.5rem 0">DEEP-TECH CORE</h3>
                        <p style="font-size:0.8rem;color:rgba(255,255,255,0.45)">What the FuFirE Engine actually computes and where it stays deterministic.</p>
                    </a>
                    <a href="formula.html" class="glass-card reveal-up" style="padding:2rem;display:block;text-decoration:none;transition:transform 0.3s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
                        <div class="tech-label kicker">03 · Formula</div>
                        <h3 class="gold-leaf-text" style="font-size:1rem;letter-spacing:0.2em;margin:0.5rem 0">MATH YOU CAN READ</h3>
                        <p style="font-size:0.8rem;color:rgba(255,255,255,0.45)">The few formulas that matter: fusion, normalization, coherence.</p>
                    </a>
                    <a href="audience.html" class="glass-card reveal-up" style="padding:2rem;display:block;text-decoration:none;transition:transform 0.3s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
                        <div class="tech-label kicker">04 · Audience</div>
                        <h3 class="gold-leaf-text" style="font-size:1rem;letter-spacing:0.2em;margin:0.5rem 0">WHO PAYS ATTENTION</h3>
                        <p style="font-size:0.8rem;color:rgba(255,255,255,0.45)">Target segments from consumer to B2B, with WTP analysis.</p>
                    </a>
                    <a href="transparency.html" class="glass-card reveal-up" style="padding:2rem;display:block;text-decoration:none;transition:transform 0.3s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
                        <div class="tech-label kicker">05 · Transparency</div>
                        <h3 class="gold-leaf-text" style="font-size:1rem;letter-spacing:0.2em;margin:0.5rem 0">TRUST LAYER</h3>
                        <p style="font-size:0.8rem;color:rgba(255,255,255,0.45)">Why the engine can be explained, validated, and productized.</p>
                    </a>
                    <a href="competition.html" class="glass-card reveal-up" style="padding:2rem;display:block;text-decoration:none;transition:transform 0.3s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''">
                        <div class="tech-label kicker">06 · Competition</div>
                        <h3 class="gold-leaf-text" style="font-size:1rem;letter-spacing:0.2em;margin:0.5rem 0">COMPETITIVE EDGE</h3>
                        <p style="font-size:0.8rem;color:rgba(255,255,255,0.45)">Honest analysis of where Bazodiac leads and where it must earn its position.</p>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <footer class="page-footer">BAZODIAC · Confidential Investor Materials · 2026</footer>
    <script src="../investor.js"></script>
    <script type="module">
        import { requireApprovedSession, signOut } from './auth-guard.js'

        const user = await requireApprovedSession()
        document.getElementById('welcome-msg').textContent =
            `Welcome, ${user.email}. You're viewing confidential pre-investment materials.`

        document.getElementById('logout-btn').addEventListener('click', signOut)
    </script>
</body>
</html>
```

**Step 2: Move all 6 subpages into `investor/`**

```bash
mv architecture.html investor/architecture.html
mv engine.html investor/engine.html
mv formula.html investor/formula.html
mv audience.html investor/audience.html
mv transparency.html investor/transparency.html
mv competition.html investor/competition.html
```

**Step 3: Fix paths in each moved file**

For EACH of the 6 moved files, make these changes:

1. `<link rel="stylesheet" href="investor.css">` → `href="../investor.css"`
2. `<a class="brand" href="index.html">` → `href="../index.html"`
3. `<a class="back-link" href="index.html#investor-dossier">` → `href="../index.html#investor-dossier"`
4. All inter-page nav links `href="engine.html"` → `href="engine.html"` (no change needed, already relative within investor/)
5. `<script src="investor.js">` → `src="../investor.js"`

Then add auth guard to each file. Before the closing `</body>` tag in each subpage, add:

```html
<script type="module">
    import { requireApprovedSession } from './auth-guard.js'
    await requireApprovedSession()
</script>
```

**Step 4: Verify redirects still work from `index.html`**

Check `index.html` investor-dossier cards — they should already point to `investor/architecture.html` etc. (done in Task 2). Verify:

```bash
grep -o 'href="investor/[^"]*"' index.html
```

Expected output — 6 lines:
```
href="investor/architecture.html"
href="investor/engine.html"
href="investor/formula.html"
href="investor/audience.html"
href="investor/transparency.html"
href="investor/competition.html"
```

**Step 5: Commit**

```bash
git add investor/
git commit -m "feat(auth): move subpages to investor/ and add auth guard to each"
```

---

## Task 6: Update `.env.example`, `.gitignore`, and Document Admin Flow

**Files:**
- Modify: `.env.example`
- Modify: `.gitignore`
- Create: `docs/ADMIN_FLOW.md`

**Step 1: Update `.env.example`**

```bash
# insight.bazodiac Environment Configuration

# === Supabase (investor auth) ===
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
# Never put service_role key here — keep it in Supabase dashboard only

# === Deployment ===
# DEPLOY_URL=https://insight.bazodiac.space

# === Feature Flags ===
# ENABLE_ANALYTICS=false
```

**Step 2: Ensure `.env` in `.gitignore`** (already there — verify)

```bash
grep "^\.env$" .gitignore
```

Expected: `.env`

**Step 3: Create `docs/ADMIN_FLOW.md`**

```markdown
# Admin Flow — Approving Investor Requests

## When a new request comes in

1. Go to https://supabase.com/dashboard → your `bazodiac-investor` project
2. Click **Table Editor** → `investor_requests`
3. You will see rows with `status = 'pending'`

## Approving an investor

1. Click the row to open it
2. Change `status` from `pending` to `approved`
3. Set `approved_at` to current timestamp: click the field → `now()`
4. Click **Save**

## Sending the magic link

After approving, go to **Auth** → **Users** in Supabase dashboard:

Option A — if user is already in Auth (clicked login before approval):
- Find their email → click **Send magic link**
- They receive an email with a secure one-time link
- Link expires in 1 hour

Option B — send directly from your email:
- Email the investor and tell them to visit: `https://insight.bazodiac.space/login.html`
- They enter their approved email → receive magic link automatically
- This is the recommended flow (they may not be in Auth yet)

## Rejecting a request

Change `status` to `rejected`. The investor will see "pending" state
on the login page (we do not distinguish pending vs rejected to the user
for privacy reasons).

## Monitoring

To see all requests by status:
```sql
select email, name, company, status, created_at
from investor_requests
order by created_at desc;
```

## Session duration

Supabase default: access token expires in 1 hour, refresh token in 1 week.
Investors with active refresh token will not need to re-click magic link
within 1 week of last activity.
```

**Step 4: Commit**

```bash
git add .env.example docs/ADMIN_FLOW.md .gitignore
git commit -m "docs: add admin flow guide + update env example for Supabase auth"
```

---

## Task 7: Final Integration + Deploy

**Files:**
- Modify: `supabase-config.js` — insert real keys
- Modify: GitHub Actions workflow (no change needed — deploys automatically)

**Step 1: Insert real Supabase keys into `supabase-config.js`**

```js
const SUPABASE_URL = 'https://REAL_PROJECT_ID.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...'
```

Note: anon key is **safe to commit** — it is the public key, protected by RLS policies.

**Step 2: End-to-end test before push**

Run this checklist locally (open in browser via `file://` or `npx serve .`):

```
□ index.html loads — hero visible, no JS errors
□ Fill form with test email → submit → Supabase row appears (status=pending)
□ Submit same email again → duplicate error message shown
□ Navigate to investor/architecture.html directly → redirected to login.html
□ login.html shows "pending" for unapproved email
□ Approve test email in Supabase dashboard
□ login.html → enter approved email → "ACCESS LINK SENT"
□ Click magic link from email → lands on investor/dashboard.html
□ dashboard.html shows all 6 cards → each subpage loads without redirect
□ Sign Out → redirected to index.html → investor/dashboard.html redirects back to login.html
□ All 6 subpages redirect to login when session expired/missing
```

**Step 3: Push to deploy**

```bash
git add supabase-config.js
git commit -m "feat(auth): activate Supabase auth — investor gate live

- Registration form → Supabase investor_requests table
- Magic link login via approved email only
- Auth guard on all 6 investor subpages + dashboard
- Admin approval flow via Supabase dashboard
- Admin guide: docs/ADMIN_FLOW.md"

git push
```

Expected: GitHub Actions deploys in ~20 seconds → `https://dyai2025.github.io/insight.bazodiac/`

**Step 4: Verify live**

```bash
curl -s https://dyai2025.github.io/insight.bazodiac/investor/architecture.html | grep "auth-guard"
```

Expected: output contains `auth-guard.js` (proves the guard is in the deployed file)

---

## Summary

| Task | What it does | Files |
|------|-------------|-------|
| Pre-Flight | Supabase project + DB + Auth (manual) | Dashboard only |
| 1 | Supabase client module | `supabase-config.js` |
| 2 | Registration form → DB | `index.html` |
| 3 | Magic link login page | `login.html` |
| 4 | Auth guard module | `investor/auth-guard.js` |
| 5 | Dashboard + move subpages | `investor/*.html` |
| 6 | Admin flow docs | `docs/ADMIN_FLOW.md` |
| 7 | E2E test + deploy | All |

**Flow after deploy:**

```
Investor visits index.html
  → fills registration form
  → row inserted: status=pending

Founder sees row in Supabase
  → changes status to approved

Investor visits login.html
  → enters email → magic link sent
  → clicks link → session established
  → dashboard.html with 6 deep-dive cards

Direct URL to investor/*.html without session
  → redirected to login.html
```
