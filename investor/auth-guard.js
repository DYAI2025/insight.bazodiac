// investor/auth-guard.js
// ──────────────────────────────────────────────────────────────────────────
// Import and await requireApprovedSession() at the top of every protected
// investor page. It handles:
//   1. Magic link token exchange (first load after clicking email link)
//   2. Session validation
//   3. Approved-status check against investor_requests table
//   4. Redirect to login.html if either check fails
// ──────────────────────────────────────────────────────────────────────────

import { supabase } from '../supabase-config.js'

/**
 * Ensures the current visitor has a valid session AND is approved.
 * Throws 'REDIRECT' (stopping further JS) when redirecting.
 * Returns { email, session } on success.
 */
export async function requireApprovedSession() {
    // ── 1. Handle magic link token in URL hash ──────────────────────────
    const hash = new URLSearchParams(location.hash.replace('#', ''))
    const accessToken = hash.get('access_token')
    if (accessToken) {
        await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hash.get('refresh_token') || ''
        })
        // Remove tokens from URL bar
        history.replaceState(null, '', location.pathname + location.search)
    }

    // ── 2. Get session ──────────────────────────────────────────────────
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        const next = encodeURIComponent(location.pathname)
        window.location.replace(`../login.html?next=${next}`)
        throw new Error('REDIRECT')
    }

    // ── 3. Check approval status in DB ──────────────────────────────────
    const { data: req } = await supabase
        .from('investor_requests')
        .select('status')
        .eq('email', session.user.email)
        .single()

    if (!req || req.status !== 'approved') {
        // Session is valid but access not yet granted → pending screen
        window.location.replace(`../login.html?next=${encodeURIComponent(location.pathname)}`)
        throw new Error('REDIRECT')
    }

    return { email: session.user.email, session }
}

/**
 * Signs the user out and redirects to the main page.
 */
export async function signOut() {
    await supabase.auth.signOut()
    window.location.replace('../index.html')
}
