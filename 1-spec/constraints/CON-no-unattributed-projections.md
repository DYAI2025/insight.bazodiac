# CON-no-unattributed-projections: Market Claims Require Source Attribution

**Category**: Business

**Status**: Active

**Source stakeholder**: [STK-founder](../stakeholders.md), [STK-investor](../stakeholders.md)

## Description

All market claims, financial projections, and statistical assertions on the insight page must either:

1. **Be attributed to a named source** — research firm, publication, dataset, with year of publication (e.g., "Source: Grand View Research, 2024")
2. **State the derivation method** — how the number was calculated, from which inputs (e.g., "Derived from X × Y based on Z report")
3. **Be explicitly labeled as preliminary** — "estimate", "projection", "preliminary benchmark", "to be validated"

### Why This Matters

- EU investor communication norms expect transparency about the basis of financial claims
- DACH-region investors (Germany, Austria, Switzerland) are particularly rigorous about source attribution
- An investor who discovers an unattributed claim will discount all other claims on the page
- This constraint directly supports [GOAL-math-transparency](../goals/GOAL-math-transparency.md) — the page must embody the same rigor BAZODIAC demands of its engine

### Current Violations

The existing `index.html` contains:
- "$2.2B" market size — no source attribution
- "73%" identity frameworks — no source attribution
- "BLUE OCEAN" / "0% BaZi penetration in West" — no evidence cited

All must be corrected.

## Rationale

BAZODIAC's core promise is "transparent mathematics, auditable, deterministic." An insight page that makes unattributed market claims contradicts this promise at the most visible level.

## Impact

- Every numerical claim in `index.html` must be reviewed and attributed
- Consider adding a small source footnote section or hover tooltips for market figures
- Source documents should be archived for investor due diligence requests

## Related Artifacts

- [GOAL-math-transparency](../goals/GOAL-math-transparency.md)
- [CON-single-source-market-data](CON-single-source-market-data.md)
- [CON-no-overclaiming](CON-no-overclaiming.md)
