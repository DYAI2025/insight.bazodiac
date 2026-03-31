# REQ-F-narrative-section-order: Page Sections Follow Investor Narrative Arc

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-narrative-arc](../user-stories/US-investor-narrative-arc.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page sections must appear in this order to build investor conviction progressively:

1. **Hero** — tagline, confidential preview framing, primary CTA
2. **Problem** — the illusion of depth in current astrology
3. **Product** — three-system fusion, FuFirE engine, Signal formula
4. **Proof** — personas with market data, segment contrast vs. Co-Star, competitive positioning vs. Cosmic Fusion
5. **Opportunity** — reconciled market figures (sourced), unit economics (3-tier model), growth mechanics
6. **Risk** — critical assumptions, defense lines, KPIs, kill criteria, pivot plans
7. **Ask** — investor CTA with email form

Sections 4 (Proof), 5 (Opportunity), and 6 (Risk) do not currently exist in `index.html` and must be created.

## Acceptance Criteria

- Given the page HTML source, when listing all `<section>` elements in DOM order, then they follow the 7-section arc: Hero → Problem → Product → Proof → Opportunity → Risk → Ask
- Given each section transition, when scrolling from one to the next, then the content connection is clear (no abrupt topic change)
- Given sections 4, 5, and 6 are new, when comparing to the existing page, then they match the established design language (glass cards, gold accents, monospace technical text, decode-title animations)
