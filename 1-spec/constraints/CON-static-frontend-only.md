# CON-static-frontend-only: Insight Page is Pure Client-Side Frontend

**Category**: Technical

**Status**: Active

**Source stakeholder**: [STK-founder](../stakeholders.md)

## Description

The insight page at bazodiac.space is built as a **pure client-side application** — vanilla HTML, CSS, and JavaScript with no server-side component. All interactivity (canvas visualizations, GSAP animations, form handling) must be client-side only.

Current stack:
- HTML + Tailwind CSS (CDN)
- GSAP 3.12 (CDN)
- Custom Canvas engine (`engine.js`)
- No build step, no bundler, no framework
- No backend, no database, no API calls (except potential form submission to external service)

## Rationale

- Minimizes hosting complexity and cost (deployable to any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages)
- Reduces attack surface (no server-side vulnerabilities)
- Ensures fast global delivery via CDN
- Appropriate for a single-page investor pitch that doesn't need dynamic data

## Impact

- The early access email form requires an external service (e.g., Formspree, Netlify Forms, or Mailchimp embed) — no server-side form handler exists
- No analytics without a third-party script (e.g., Plausible, Fathom, or a minimal self-hosted solution)
- If dynamic content is needed in the future (e.g., live Coherence Index, real FuFirE calculation demo), it would require either a backend addition or a pre-computed static dataset

## Related Artifacts

- [GOAL-premium-brand-perception](../goals/GOAL-premium-brand-perception.md)
