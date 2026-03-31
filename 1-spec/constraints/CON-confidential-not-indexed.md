# CON-confidential-not-indexed: Page Must Not Be Crawled by Search Engines

**Category**: Operational

**Status**: Active

**Source stakeholder**: [STK-founder](../stakeholders.md)

## Description

The insight page is positioned as a **"Confidential Preview"** (displayed in the hero section). It must not appear in public search engine results.

### Required Technical Measures

1. `<meta name="robots" content="noindex, nofollow">` in `<head>`
2. `X-Robots-Tag: noindex` HTTP header (if hosting platform supports it)
3. `robots.txt` disallow rule for the page path
4. No submission to Google Search Console or other indexing tools

### Current Status

The page currently does **not** have a `noindex` meta tag — this must be added.

## Rationale

- The page contains preliminary financial projections, market claims, and competitive positioning that are not yet validated for public consumption
- Investor materials shared prematurely can create unwanted press coverage or competitor awareness
- The "Confidential Preview" label sets an expectation of restricted access that must be technically enforced

## Impact

- Add `noindex` meta tag to `index.html`
- If the page is later made public (post-funding, post-launch), this constraint can be lifted
- Consider optional password protection or link-based access control for higher confidentiality

## Related Artifacts

- [GOAL-investor-conviction](../goals/GOAL-investor-conviction.md)
