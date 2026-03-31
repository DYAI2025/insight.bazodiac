Phase-specific instructions for the **Specification** phase. Extends [../CLAUDE.md](../CLAUDE.md).

## Purpose

This phase defines **what** we're building and **why**. Focus on clarity, measurability, and alignment with stakeholder needs.

## Phase artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| Stakeholders | [`stakeholders.md`](stakeholders.md) | Roles with interests and influence |
| Goals | [`goals/`](goals/) | High-level outcomes |
| User Stories | [`user-stories/`](user-stories/) | User-facing capabilities |
| Requirements | [`requirements/`](requirements/) | Testable system requirements |
| Assumptions | [`assumptions/`](assumptions/) | Beliefs taken as true but not verified |
| Constraints | [`constraints/`](constraints/) | Hard limits on design and implementation |

---

## AI Guidelines

### Per-artifact guidance

**Stakeholders**: ask who uses, funds, operates, or is affected by the system. Record influence level honestly — it drives conflict resolution. Add entries to [`stakeholders.md`](stakeholders.md).

**Goals**: decompose vague ideas into concrete, measurable outcomes. Use MoSCoW priority consistently.
Status lifecycle: `Draft → Approved → Achieved → Deprecated`. Only a human can approve or deprecate. The agent marks `Achieved` when all success criteria are met (linked requirements implemented).

**User Stories**: use "As a [role], I want [capability], so that [benefit]." The role must be an existing stakeholder ID. Acceptance criteria at the story level are high-level; detailed criteria live in requirements.
Status lifecycle: `Draft → Approved → Implemented → Deprecated`. Only a human can approve or deprecate. The agent marks `Implemented` when all linked requirements reach `Implemented`.

**Requirements**: use clear, testable language (not "should be fast" — use "response time < 200ms at p95"). Choose the correct requirement class.
Requirement classes: `REQ-F` Functional, `REQ-PERF` Performance, `REQ-SEC` Security, `REQ-REL` Reliability, `REQ-USA` Usability, `REQ-MNT` Maintainability, `REQ-PORT` Portability, `REQ-SCA` Scalability, `REQ-COMP` Compliance.
Status lifecycle: `Draft → Approved → Implemented → Deprecated`. Only a human can approve or deprecate. The agent marks `Implemented` when all linked tasks reach Done.

**Assumptions**: always record the risk level (what happens if wrong?) and a verification plan when possible.
Status lifecycle: `Unverified → Verified | Invalidated`. The agent marks `Verified` when the verification plan confirms the assumption. Only a human can mark `Invalidated` (triggers impact analysis on dependent artifacts).

**Constraints**: consider technical (platforms, dependencies), business (budget, timeline, team size), and operational (hosting, compliance) categories.
Status lifecycle: `Active → Lifted`. Only a human can lift a constraint.

### Conflict resolution

A conflict exists when two or more requirements cannot both be satisfied as stated.

**Never resolve a conflict silently.** Always surface it before acting.

1. **Identify**: note conflicting requirement IDs, source stakeholders, influence levels, and why they are incompatible.
2. **Ask the user**: present what makes them incompatible, stakeholders and influence levels, two or more resolution options, and a recommended option if one is clearly better.
3. **Wait for explicit approval** before modifying any file.
4. **Apply**: update affected requirement files and index rows. Update dependent user stories or goals if affected. Record a decision if the resolution imposes a recurring constraint.
5. **Verify**: no artifacts remain in a conflicting state after resolution.

### Assumption invalidation

When an assumption is found to be wrong or no longer holds:

1. **Identify impact**: list all artifacts (requirements, user stories, decisions) that depend on the invalidated assumption.
2. **Ask the user**: present the invalidated assumption, the affected artifacts, and proposed adjustments or alternatives.
3. **Wait for explicit approval** before modifying any file.
4. **Apply**: change the assumption's Status to `Invalidated`. Update or flag all dependent artifacts as directed.
5. **Verify**: no artifacts remain based on the invalidated assumption without acknowledgment.

### Artifact deprecation

When an artifact (goal, user story, requirement) is no longer relevant:

1. Propose deprecation to the user with rationale and downstream impact.
2. Wait for explicit approval.
3. Change Status to `Deprecated` in the artifact file. Update its index row.
4. Check for dependent artifacts — flag any that reference the deprecated item.

---

## Decisions Relevant to This Phase

| File | Title | Trigger |
|------|-------|---------|
<!-- Add rows as decisions are recorded. File column: [DEC-kebab-name](../decisions/DEC-kebab-name.md) -->

---

## Linking to Other Phases

- Goals, user stories, constraints, assumptions, and requirements are referenced in design documents (`2-design/`)
- Requirements determine the development tasks in `3-code/tasks.md`; each task references the requirements it fulfills
- Acceptance criteria inform test cases (`3-code/`)

---

## Goals Index

| File | Priority | Status | Summary |
|------|----------|--------|---------|
| [GOAL-investor-conviction](goals/GOAL-investor-conviction.md) | Must-have | Draft | Page must move investor from curiosity to conviction in a single scroll — answering market, team, and timing questions |
| [GOAL-math-transparency](goals/GOAL-math-transparency.md) | Must-have | Draft | Every number, formula, and market claim must be realistic, plausible, and auditable with sources |
| [GOAL-persona-market-proof](goals/GOAL-persona-market-proof.md) | Must-have | Draft | Prove the framework-curious premium segment is larger and more monetizable than entertainment astrology |
| [GOAL-premium-brand-perception](goals/GOAL-premium-brand-perception.md) | Must-have | Draft | Visual/interaction design signals "deep tech meets luxury" — not "another astrology app" |
| [GOAL-risk-transparency](goals/GOAL-risk-transparency.md) | Must-have | Draft | Show investors that risks are identified, quantified, and have kill criteria with 90-day validation cycle |

---

## User Stories Index

| File | Role | Priority | Status | Summary |
|------|------|----------|--------|---------|
| [US-investor-understands-product](user-stories/US-investor-understands-product.md) | STK-investor | Must-have | Draft | Understand what BAZODIAC does within 60 seconds of landing |
| [US-investor-competitive-positioning](user-stories/US-investor-competitive-positioning.md) | STK-investor | Must-have | Draft | See honest positioning against Cosmic Fusion with attack strategy |
| [US-investor-clear-ask](user-stories/US-investor-clear-ask.md) | STK-investor | Must-have | Draft | Find a clear CTA (meeting/contact) without scrolling the entire page |
| [US-investor-narrative-arc](user-stories/US-investor-narrative-arc.md) | STK-investor | Must-have | Draft | Follow problem → product → proof → opportunity → risk → ask in one scroll |
| [US-investor-verifiable-market-claims](user-stories/US-investor-verifiable-market-claims.md) | STK-investor | Must-have | Draft | Every market figure has a named research source with year |
| [US-investor-understands-fufire](user-stories/US-investor-understands-fufire.md) | STK-investor | Must-have | Draft | See FuFirE formula with correct math and plain-language explanation |
| [US-investor-coherence-index](user-stories/US-investor-coherence-index.md) | STK-investor | Should-have | Draft | Understand Coherence Index H — range, meaning, interpretation |
| [US-investor-sees-personas](user-stories/US-investor-sees-personas.md) | STK-investor | Must-have | Draft | See four personas with demographic detail and monetization roles |
| [US-investor-segment-contrast](user-stories/US-investor-segment-contrast.md) | STK-investor | Must-have | Draft | Explicit contrast: framework-curious segment ≠ Co-Star entertainment users |
| [US-investor-unit-economics](user-stories/US-investor-unit-economics.md) | STK-investor | Must-have | Draft | See 3-tier pricing with preliminary unit economics and benchmarks |
| [US-investor-premium-impression](user-stories/US-investor-premium-impression.md) | STK-investor | Must-have | Draft | First impression says "deep tech / fintech", not "astrology app" |
| [US-investor-interactive-proof](user-stories/US-investor-interactive-proof.md) | STK-investor | Must-have | Draft | Smooth interactive canvas visualizations proving technical capability |
| [US-investor-mobile-experience](user-stories/US-investor-mobile-experience.md) | STK-investor | Must-have | Draft | Premium experience on phone — shareable link that impresses on any device |
| [US-investor-sees-risk-framework](user-stories/US-investor-sees-risk-framework.md) | STK-investor | Must-have | Draft | Honest risk assessment with defense lines, KPIs, and kill criteria |
| [US-investor-sees-pivot-plans](user-stories/US-investor-sees-pivot-plans.md) | STK-investor | Must-have | Draft | Concrete fallback plans (FaaS B2B, volume pivot) if assumptions fail |

---

## Requirements Index

| File | Type | Priority | Status | Summary |
|------|------|----------|--------|---------|
| [REQ-F-noindex-enforcement](requirements/REQ-F-noindex-enforcement.md) | Functional | Must-have | Draft | Page must have `noindex, nofollow` meta tag (already implemented) |
| [REQ-F-replace-overclaiming-language](requirements/REQ-F-replace-overclaiming-language.md) | Functional | Must-have | Draft | Audit and replace prohibited superlatives and mythopoetic terms |
| [REQ-F-reconciled-market-figures](requirements/REQ-F-reconciled-market-figures.md) | Functional | Must-have | Draft | Display reconciled $14.3B/$4.73B market data with source attribution |
| [REQ-F-hero-60s-comprehension](requirements/REQ-F-hero-60s-comprehension.md) | Functional | Must-have | Draft | Hero + first section communicate product in under 60 seconds |
| [REQ-F-competitive-positioning-section](requirements/REQ-F-competitive-positioning-section.md) | Functional | Must-have | Draft | Competitive analysis section naming Cosmic Fusion with attack strategy |
| [REQ-F-investor-cta-accessibility](requirements/REQ-F-investor-cta-accessibility.md) | Functional | Must-have | Draft | Investor CTA reachable from hero, confirmation on submit |
| [REQ-F-narrative-section-order](requirements/REQ-F-narrative-section-order.md) | Functional | Must-have | Draft | 7-section narrative arc: Hero→Problem→Product→Proof→Opportunity→Risk→Ask |
| [REQ-F-section-navigation](requirements/REQ-F-section-navigation.md) | Functional | Should-have | Draft | Mobile nav dots and anchor links for all 7 sections |
| [REQ-F-source-attribution-all-figures](requirements/REQ-F-source-attribution-all-figures.md) | Functional | Must-have | Draft | Every numerical claim has visible source attribution within 50px |
| [REQ-F-fufire-formula-correct](requirements/REQ-F-fufire-formula-correct.md) | Functional | Must-have | Draft | Signal formula mathematically correct: weights=1.0, R⁵/S⁴ accurate |
| [REQ-F-fufire-plain-language](requirements/REQ-F-fufire-plain-language.md) | Functional | Must-have | Draft | Plain-language explanation of W, B, X, weights, and Signal output |
| [REQ-F-coherence-index-defined](requirements/REQ-F-coherence-index-defined.md) | Functional | Should-have | Draft | H defined with range [0,1], interpretation, simulated label |
| [REQ-F-persona-cards-section](requirements/REQ-F-persona-cards-section.md) | Functional | Must-have | Draft | New section with 4 persona cards + monetization role matrix |
| [REQ-F-segment-contrast-display](requirements/REQ-F-segment-contrast-display.md) | Functional | Must-have | Draft | Visual comparison: framework-curious vs. entertainment-astrology segment |
| [REQ-F-unit-economics-display](requirements/REQ-F-unit-economics-display.md) | Functional | Must-have | Draft | CAC/LTV/retention/conversion targets, all labeled preliminary |
| [REQ-F-pricing-tiers-display](requirements/REQ-F-pricing-tiers-display.md) | Functional | Must-have | Draft | 3-tier model (Free/Essentials/Premium) with features and benchmarks |
| [REQ-USA-deep-tech-first-impression](requirements/REQ-USA-deep-tech-first-impression.md) | Usability | Must-have | Draft | Design signals technology before astrology, no prohibited visual elements |
| [REQ-PERF-canvas-30fps](requirements/REQ-PERF-canvas-30fps.md) | Performance | Must-have | Draft | All canvas visualizations ≥30fps on MacBook Air M1 / iPhone 13+ |
| [REQ-USA-mobile-premium-experience](requirements/REQ-USA-mobile-premium-experience.md) | Usability | Must-have | Draft | Mobile layout: no h-scroll, no hidden sections, ≥44px inputs |
| [REQ-PERF-mobile-load-3s](requirements/REQ-PERF-mobile-load-3s.md) | Performance | Must-have | Draft | FCP ≤3s on 4G, initial load <500KB |
| [REQ-F-risk-section-content](requirements/REQ-F-risk-section-content.md) | Functional | Must-have | Draft | New section with both critical risks, diagnosis, and defense lines |
| [REQ-F-kpi-kill-criteria-display](requirements/REQ-F-kpi-kill-criteria-display.md) | Functional | Must-have | Draft | KPI tables with target/warning/kill + 90-day validation timeline |
| [REQ-F-pivot-plans-display](requirements/REQ-F-pivot-plans-display.md) | Functional | Must-have | Draft | FaaS B2B + Volume Pivot scenarios with trigger conditions |

---

## Assumptions Index

| File | Category | Status | Risk | Summary |
|------|----------|--------|------|---------|
| [ASM-preliminary-pricing](assumptions/ASM-preliminary-pricing.md) | Business | Unverified | Medium | €4.99/month is placeholder — real pricing requires unit economics and investor input |
| [ASM-fufire-substance-over-cosmic-ux](assumptions/ASM-fufire-substance-over-cosmic-ux.md) | Business | Unverified | High | BAZODIAC can beat Cosmic Fusion on substance if claims are demythologized and verified |
| [ASM-framework-segment-higher-wtp](assumptions/ASM-framework-segment-higher-wtp.md) | Business | Unverified | High | Framework-curious segment pays more than entertainment-astrology users |
| [ASM-market-size-defensible](assumptions/ASM-market-size-defensible.md) | Business | Unverified | Medium | Market figures ($14.3B total, $4.73B apps) are attributable to credible research |
| [ASM-cac-under-three](assumptions/ASM-cac-under-three.md) | Business | Unverified | Medium | CAC <€3 achievable via viral mechanics (k=0.8, Signature-Morph sharing) |
| [ASM-ltv-range-plausible](assumptions/ASM-ltv-range-plausible.md) | Business | Unverified | Medium | €35–50 LTV at 7–10 months retention is realistic for premium segment |

---

## Constraints Index

| File | Category | Status | Summary |
|------|----------|--------|---------|
| [CON-subscription-not-onetime](constraints/CON-subscription-not-onetime.md) | Business | Active | Monetization is subscription (€4.99/month preliminary), NOT one-time payment — legacy translation error |
| [CON-cosmic-fusion-incumbent](constraints/CON-cosmic-fusion-incumbent.md) | Business | Active | Cosmic Fusion is the direct competitor — insight page must acknowledge, position against, and present attack strategy |
| [CON-no-overclaiming](constraints/CON-no-overclaiming.md) | Business | Active | No unverified superlatives or mythopoetic language in investor materials — FuFirE has Overconfidence + Complexity Bias |
| [CON-single-source-market-data](constraints/CON-single-source-market-data.md) | Business | Active | Market figures must be reconciled: $14.3B total, $4.73B apps, CAGR 6%/20.2% — no conflicting numbers |
| [CON-static-frontend-only](constraints/CON-static-frontend-only.md) | Technical | Active | Insight page is pure client-side HTML/CSS/JS — no backend |
| [CON-confidential-not-indexed](constraints/CON-confidential-not-indexed.md) | Operational | Active | Page must have noindex — "Confidential Preview" must be technically enforced |
| [CON-no-unattributed-projections](constraints/CON-no-unattributed-projections.md) | Business | Active | All market claims require source attribution or explicit "estimate" labeling |
| [CON-90-day-kill-discipline](constraints/CON-90-day-kill-discipline.md) | Business | Active | Non-negotiable 90-day validation cycle with pre-committed kill criteria for both HIGH-risk assumptions |
