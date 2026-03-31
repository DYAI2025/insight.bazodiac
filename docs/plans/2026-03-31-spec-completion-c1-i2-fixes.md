# Specification Completion: Requirements (C1) + Content Fixes (I2, I3, I4)

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Resolve all remaining Critical and Important gap analysis findings — create requirements for all 15 user stories + 3 constraint-implied requirements, fix live page content violations (wrong market figure, unverified "world's first" claim), and update all traceability links.

**Architecture:** Requirements are Markdown files in `1-spec/requirements/` following the template pattern. Content fixes are direct edits to `index.html`. All index tables in `1-spec/CLAUDE.spec.md` must be updated after each batch. The `CLAUDE.md` Current State section must reflect final artifact counts.

**Tech Stack:** Markdown artifacts, HTML content editing, git

---

## Phase 1: Content Fixes (I2 + I3) — Fix Live Page Violations

These are independent of requirements and fix investor-facing credibility issues on the live site.

### Task 1: Fix Market Figure — "$2.2B" → Reconciled Data (I2)

**Files:**
- Modify: `index.html:366-386` (SECTION 7: MARKET)

**Step 1: Update market section headline and data**

Replace the market section content. The reconciled figures per CON-single-source-market-data are:
- $14.3B global astrology total (2024)
- $4.73B astrology apps segment (2025)
- 20.2% CAGR apps segment
- Keep "BLUE OCEAN" card but add substantiation
- Keep "73%" card but mark source needed

In `index.html`, find the SECTION 7: MARKET block (~line 366-386) and replace:

```html
<!-- SECTION 7: MARKET -->
<section id="market" class="py-32 px-6 border-b border-white/[0.04]">
    <div class="max-w-6xl mx-auto">
        <span class="tech-label text-[#D4AF37]/60 block mb-4 text-center">INVESTOR SIGNAL</span>
        <h2 class="text-center section-title gold-leaf-text mb-20 decode-title" data-text="THE $14.3B OPPORTUNITY">THE $14.3B OPPORTUNITY</h2>
        
        <div class="grid md:grid-cols-3 gap-8">
            <div class="glass-card p-12 text-center reveal-up">
                <div class="data-number" data-target="14.3" data-prefix="$" data-suffix="B">$0.0B</div>
                <p class="tech-label text-white/30 mt-4">Global Astrology Market (2024)</p>
                <p class="text-[10px] text-white/20 mt-2 mono">Source: Precedence Research, 2024</p>
            </div>
            <div class="glass-card p-12 text-center border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.05)] reveal-up">
                <div class="data-number" data-target="4.73" data-prefix="$" data-suffix="B">$0.0B</div>
                <p class="tech-label text-white/30 mt-4">Apps Segment (2025) · 20.2% CAGR</p>
                <p class="text-[10px] text-white/20 mt-2 mono">→ $11.7B by 2030</p>
            </div>
            <div class="glass-card p-12 text-center reveal-up">
                <div class="text-[#D4AF37] text-xl tracking-[0.3em] font-extralight mb-4 uppercase">BLUE OCEAN</div>
                <p class="tech-label text-white/30 text-xs">0% auditable BaZi fusion in West.</p>
                <p class="text-[10px] text-white/20 mt-2 mono">Incumbent: Cosmic Fusion (black-box engine)</p>
            </div>
        </div>
    </div>
</section>
```

Key changes:
- `$2.2B` → `$14.3B` (global total, sourced)
- Added `$4.73B` apps segment with CAGR
- "0% BaZi penetration" → "0% auditable BaZi fusion" (more precise — Cosmic Fusion exists but is black-box)
- Added source attributions as small mono text
- Removed unattributed "73% Identity Frameworks" card (moved to persona section in Phase 3)

**Step 2: Verify data-number JS still works with new targets**

Open `index.html` in browser. Scroll to market section. Verify:
- "$14.3B" counts up correctly
- "$4.73B" counts up correctly
- No JS errors in console

**Step 3: Commit**

```bash
git add index.html
git commit -m "fix(I2): reconcile market figures — \$14.3B total / \$4.73B apps / 20.2% CAGR

Per CON-single-source-market-data. Added source attributions.
Removed unattributed 73% card. Reframed Blue Ocean per CON-cosmic-fusion-incumbent."
```

---

### Task 2: Fix "World's First" Claim (I3)

**Files:**
- Modify: `index.html:257` (hero subtitle)

**Step 1: Soften unverified claim**

In `index.html`, find line ~257:

Old:
```html
The world's first mathematical fusion of<br>
Western Astrology and Chinese BaZi.
```

New:
```html
A mathematical fusion of Western Astrology,<br>
Chinese BaZi, and Wu-Xing — auditable and deterministic.
```

Rationale: Per CON-no-overclaiming, "world's first" requires dated prior art verification. Until that search is completed, soften to a factual description that emphasizes the actual differentiators (auditable, deterministic) rather than an unprovable superlative.

**Step 2: Commit**

```bash
git add index.html
git commit -m "fix(I3): soften 'world's first' to factual claim per CON-no-overclaiming

Replaced unverified superlative with auditable differentiators.
Can be restored after prior art search confirms uniqueness."
```

---

## Phase 2: Constraint-Implied Requirements (I4)

These 3 requirements are derived directly from constraints that impose verifiable obligations.

### Task 3: REQ-F-noindex-enforcement (from CON-confidential-not-indexed)

**Files:**
- Create: `1-spec/requirements/REQ-F-noindex-enforcement.md`
- Modify: `1-spec/CLAUDE.spec.md` (Requirements Index)

**Step 1: Create requirement file**

```markdown
# REQ-F-noindex-enforcement: Page Must Have noindex Meta Tag

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [CON-confidential-not-indexed](../constraints/CON-confidential-not-indexed.md)

**Source stakeholder**: [STK-founder](../stakeholders.md)

## Description

The `index.html` file must contain `<meta name="robots" content="noindex, nofollow">` in the `<head>` section to prevent search engine crawling. This enforces the "Confidential Preview" positioning.

## Acceptance Criteria

- Given the page is deployed to bazodiac.space, when a search engine crawler visits, then it finds a `noindex, nofollow` robots meta tag in the HTML `<head>`
- Given a developer inspects `index.html`, when they search for the robots meta tag, then it exists on a line before `</head>`
```

**Step 2: Add to Requirements Index in `1-spec/CLAUDE.spec.md`**

**Step 3: Commit**

```bash
git add 1-spec/requirements/REQ-F-noindex-enforcement.md 1-spec/CLAUDE.spec.md
git commit -m "spec: REQ-F-noindex-enforcement — from CON-confidential-not-indexed"
```

---

### Task 4: REQ-F-replace-overclaiming-language (from CON-no-overclaiming)

**Files:**
- Create: `1-spec/requirements/REQ-F-replace-overclaiming-language.md`
- Modify: `1-spec/CLAUDE.spec.md` (Requirements Index)

**Step 1: Create requirement file**

```markdown
# REQ-F-replace-overclaiming-language: Audit and Replace Prohibited Language Patterns

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [CON-no-overclaiming](../constraints/CON-no-overclaiming.md)

**Source stakeholder**: [STK-founder](../stakeholders.md), [STK-investor](../stakeholders.md)

## Description

The `index.html` file must not contain any of the prohibited patterns defined in CON-no-overclaiming: unverified superlatives ("only engine worldwide", "world's first" without prior art verification, "technological market leader") or mythopoetic marketing terms in technical contexts ("Obsidian Core", "Neural Mycelium", "Bioluminescent Membrane", "Soul Signature", "Digital Organism").

## Acceptance Criteria

- Given a text search of `index.html`, when searching for the prohibited terms listed in CON-no-overclaiming, then zero matches are found
- Given the FuFirE Engine section describes the architecture, when technical layers are named, then they use engineering terms: "Deterministic Calculation Layer", "Modulation Layer", "Visualization Layer"
- Given market claims appear on the page, when checking for superlatives, then every claim is either (a) sourced, (b) derived with stated method, or (c) labeled as preliminary

## Related Constraints

- [CON-no-overclaiming](../constraints/CON-no-overclaiming.md)
```

**Step 2: Add to Requirements Index**

**Step 3: Commit**

```bash
git add 1-spec/requirements/REQ-F-replace-overclaiming-language.md 1-spec/CLAUDE.spec.md
git commit -m "spec: REQ-F-replace-overclaiming-language — from CON-no-overclaiming"
```

---

### Task 5: REQ-F-reconciled-market-figures (from CON-single-source-market-data)

**Files:**
- Create: `1-spec/requirements/REQ-F-reconciled-market-figures.md`
- Modify: `1-spec/CLAUDE.spec.md` (Requirements Index)

**Step 1: Create requirement file**

```markdown
# REQ-F-reconciled-market-figures: Display Reconciled Market Data With Source Attribution

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [CON-single-source-market-data](../constraints/CON-single-source-market-data.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

All market figures on the insight page must use the reconciled data set: $14.3B global total (2024), $4.73B apps segment (2025), CAGR 6.0% total / 20.2% apps, projections $25.6B (2034) / $11.7B (2030). Each figure must include inline source attribution (research firm name + year).

## Acceptance Criteria

- Given the market section is visible, when an investor reads the figures, then each number matches the reconciled set defined in CON-single-source-market-data
- Given any market figure is displayed, when the investor looks for a source, then attribution text is visible (research firm name + publication year) within 50px of the number
- Given the page is compared against supporting documents (persona dossier, investment memo), when checking for consistency, then all documents use the same reconciled figures

## Related Constraints

- [CON-single-source-market-data](../constraints/CON-single-source-market-data.md)
- [CON-no-unattributed-projections](../constraints/CON-no-unattributed-projections.md)

## Related Assumptions

- [ASM-market-size-defensible](../assumptions/ASM-market-size-defensible.md) — figures need source verification
```

**Step 2: Add to Requirements Index**

**Step 3: Commit**

```bash
git add 1-spec/requirements/REQ-F-reconciled-market-figures.md 1-spec/CLAUDE.spec.md
git commit -m "spec: REQ-F-reconciled-market-figures — from CON-single-source-market-data"
```

---

## Phase 3: User-Story-Derived Requirements (C1)

Requirements derived from each of the 15 user stories. Grouped by goal for efficiency.

### Task 6: Requirements for GOAL-investor-conviction (4 stories → 5 requirements)

**Files:**
- Create: `1-spec/requirements/REQ-F-hero-60s-comprehension.md`
- Create: `1-spec/requirements/REQ-F-competitive-positioning-section.md`
- Create: `1-spec/requirements/REQ-F-investor-cta-accessibility.md`
- Create: `1-spec/requirements/REQ-F-narrative-section-order.md`
- Create: `1-spec/requirements/REQ-F-section-navigation.md`
- Modify: `1-spec/CLAUDE.spec.md` (Requirements Index)
- Modify: `1-spec/user-stories/US-investor-understands-product.md` (Derived Requirements)
- Modify: `1-spec/user-stories/US-investor-competitive-positioning.md` (Derived Requirements)
- Modify: `1-spec/user-stories/US-investor-clear-ask.md` (Derived Requirements)
- Modify: `1-spec/user-stories/US-investor-narrative-arc.md` (Derived Requirements)

**Step 1: Create REQ-F-hero-60s-comprehension.md**

```markdown
# REQ-F-hero-60s-comprehension: Hero + First Section Communicate Product in Under 60 Seconds

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-understands-product](../user-stories/US-investor-understands-product.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The hero section and first content section (Problem) must together communicate: (1) what BAZODIAC is (mathematical fusion of 3 systems), (2) what problem it solves (one-dimensional astrology with no math), and (3) why it matters (transparent, deterministic, auditable). A first-time reader should be able to articulate the product in one sentence after reading these two sections.

## Acceptance Criteria

- Given the hero section, when an investor reads the tagline and subtitle, then they encounter the words "mathematical", "fusion", and at least two of the three systems (Western Astrology, BaZi, Wu-Xing)
- Given the hero and problem sections together, when measured by word count, then total reading time is under 60 seconds at average reading speed (250 wpm → max ~250 words combined visible text)
- Given the hero section, when viewed on desktop (1440px), then the tagline, subtitle, FuFirE label, and CTA are all visible without scrolling
```

**Step 2: Create REQ-F-competitive-positioning-section.md**

```markdown
# REQ-F-competitive-positioning-section: Page Includes Competitive Analysis vs. Cosmic Fusion

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-competitive-positioning](../user-stories/US-investor-competitive-positioning.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must include a dedicated competitive positioning section that names Cosmic Fusion as the primary competitor, presents a comparison matrix of capabilities (BaZi depth, auditable math, DACH focus, AI companion, dynamic visualization), identifies Cosmic Fusion's weaknesses (black-box engine, year-animal-only BaZi), and articulates BAZODIAC's attack strategy with milestones. Must contain zero instances of "only engine worldwide" or "no competitor."

## Acceptance Criteria

- Given the competitive section, when an investor reads it, then "Cosmic Fusion" is named explicitly at least once
- Given the comparison, when reviewing the matrix, then at least 4 differentiation criteria are shown (e.g., BaZi depth, auditable math, Coherence Index, DACH focus, AI Companion)
- Given the full page text, when searching for prohibited superlatives ("only engine worldwide", "no competitor", "market leader"), then zero matches are found
- Given the attack strategy, when an investor reads it, then at least 3 milestones are listed with approximate timeframes

## Related Constraints

- [CON-cosmic-fusion-incumbent](../constraints/CON-cosmic-fusion-incumbent.md)
- [CON-no-overclaiming](../constraints/CON-no-overclaiming.md)
```

**Step 3: Create REQ-F-investor-cta-accessibility.md**

```markdown
# REQ-F-investor-cta-accessibility: Investor CTA Reachable From Any Scroll Position

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-clear-ask](../user-stories/US-investor-clear-ask.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must provide an investor-specific call-to-action that is accessible without requiring the user to scroll to the bottom. At minimum: (1) an anchor link in the hero section (e.g., "For Investors →" linking to market/CTA section), (2) a primary CTA form in the final section with email input and submit button, (3) visible confirmation after form submission.

## Acceptance Criteria

- Given the hero section, when an investor looks for a next step, then a visible link labeled "For Investors" or equivalent points to the market/opportunity section
- Given the final CTA section, when an investor submits their email, then a visible confirmation message appears (not a silent submit or page reload)
- Given a mobile device, when the CTA form is used, then input fields are at least 44px tall (thumb-friendly), keyboard appears without layout shift, and the submit button is reachable without scrolling past the input
```

**Step 4: Create REQ-F-narrative-section-order.md**

```markdown
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
```

**Step 5: Create REQ-F-section-navigation.md**

```markdown
# REQ-F-section-navigation: Minimal Navigation Allows Section Jumping

**Type**: Functional

**Status**: Should-have

**Priority**: Should-have

**Source**: [US-investor-narrative-arc](../user-stories/US-investor-narrative-arc.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page should provide minimal navigation (mobile nav dots or sticky anchor links) that allows an investor to jump to a specific section without scrolling through the entire page. The current mobile nav dots exist but only link to 3 sections. All 7 narrative sections should be navigable.

## Acceptance Criteria

- Given the mobile nav at the bottom of the screen, when an investor taps a dot, then the page scrolls to the corresponding section
- Given all 7 sections have `id` attributes, when using URL anchors (e.g., `#market`, `#risk`), then the browser scrolls to the correct section
```

**Step 6: Update all 4 user story files — Derived Requirements section**

Replace `_none yet_` in each:
- `US-investor-understands-product.md` → link to REQ-F-hero-60s-comprehension
- `US-investor-competitive-positioning.md` → link to REQ-F-competitive-positioning-section
- `US-investor-clear-ask.md` → link to REQ-F-investor-cta-accessibility
- `US-investor-narrative-arc.md` → link to REQ-F-narrative-section-order, REQ-F-section-navigation

**Step 7: Add all 5 requirements to Requirements Index in `1-spec/CLAUDE.spec.md`**

**Step 8: Commit**

```bash
git add 1-spec/requirements/REQ-F-hero-60s-comprehension.md \
       1-spec/requirements/REQ-F-competitive-positioning-section.md \
       1-spec/requirements/REQ-F-investor-cta-accessibility.md \
       1-spec/requirements/REQ-F-narrative-section-order.md \
       1-spec/requirements/REQ-F-section-navigation.md \
       1-spec/user-stories/US-investor-*.md \
       1-spec/CLAUDE.spec.md
git commit -m "spec: 5 requirements for GOAL-investor-conviction stories

REQ-F-hero-60s-comprehension, REQ-F-competitive-positioning-section,
REQ-F-investor-cta-accessibility, REQ-F-narrative-section-order,
REQ-F-section-navigation (Should-have)"
```

---

### Task 7: Requirements for GOAL-math-transparency (3 stories → 4 requirements)

**Files:**
- Create: `1-spec/requirements/REQ-F-source-attribution-all-figures.md`
- Create: `1-spec/requirements/REQ-F-fufire-formula-correct.md`
- Create: `1-spec/requirements/REQ-F-fufire-plain-language.md`
- Create: `1-spec/requirements/REQ-F-coherence-index-defined.md`
- Modify: `1-spec/CLAUDE.spec.md` (Requirements Index)
- Modify: 3 user story files (Derived Requirements)

**Step 1: Create all 4 requirement files**

`REQ-F-source-attribution-all-figures.md`:
```markdown
# REQ-F-source-attribution-all-figures: Every Numerical Claim Has Visible Source Attribution

**Type**: Functional
**Status**: Draft
**Priority**: Must-have
**Source**: [US-investor-verifiable-market-claims](../user-stories/US-investor-verifiable-market-claims.md)
**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description
Every market size, CAGR, demographic percentage, and financial projection displayed on the page must have visible source attribution within 50px of the number. Attribution format: research firm name + publication year (e.g., "Source: Precedence Research, 2024"). Preliminary estimates must be labeled "preliminary estimate — to be validated."

## Acceptance Criteria
- Given any `.data-number` element or inline statistic, when visually inspecting its vicinity, then source attribution text is present in a smaller font
- Given subscription pricing is displayed, when checking its framing, then it is labeled as "preliminary benchmark" or equivalent
- Given total count of numerical claims on the page, when auditing for attribution, then 100% have either a named source or an explicit "estimate" label
```

`REQ-F-fufire-formula-correct.md`:
```markdown
# REQ-F-fufire-formula-correct: FuFirE Formula is Mathematically Correct and Verifiable

**Type**: Functional
**Status**: Draft
**Priority**: Must-have
**Source**: [US-investor-understands-fufire](../user-stories/US-investor-understands-fufire.md)
**Source stakeholder**: [STK-investor](../stakeholders.md), [STK-marc](../stakeholders.md)

## Description
The Signal formula `Signal(s) = 0.375·W(s) + 0.375·B(s) + 0.25·X(s)` must be displayed with mathematically correct properties: weights sum to 1.0 (convex combination), dimensional claims (R⁵ for 5 elements, S⁴ for unit sphere in 5D) are accurate, and L2-normalization is correctly described.

## Acceptance Criteria
- Given the formula is displayed, when summing the weights, then 0.375 + 0.375 + 0.25 = 1.000
- Given the text claims "R⁵ space", when a mathematician reviews it, then it correctly corresponds to 5 elements (Wood, Fire, Earth, Metal, Water) as vector dimensions
- Given the text claims "S⁴ sphere", when verified, then S⁴ is correctly the unit sphere in R⁵ (n-sphere in n+1 dimensions)
- Given the formula section, when searching for mythopoetic terms, then zero instances of "Obsidian Core", "Neural Mycelium", or "Bioluminescent Membrane" are found
```

`REQ-F-fufire-plain-language.md`:
```markdown
# REQ-F-fufire-plain-language: FuFirE Section Includes Plain-Language Explanation

**Type**: Functional
**Status**: Must-have
**Priority**: Must-have
**Source**: [US-investor-understands-fufire](../user-stories/US-investor-understands-fufire.md)
**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description
Alongside the mathematical formula, the FuFirE section must include a plain-language explanation that a non-technical investor can follow: what W, B, X represent in human terms, why the weights are set as shown (equal weight for Western and BaZi as primary systems, lower weight for Wu-Xing as elemental layer), and what the output Signal means practically ("a 5-dimensional profile that captures your identity across three ancient traditions").

## Acceptance Criteria
- Given a non-technical investor reads the FuFirE section, when encountering W, B, X, then each is explained in one sentence (e.g., "W = Western Astrology — your planetary geometry and natal aspects")
- Given the weight rationale, when an investor asks "why these weights?", then the text explains the logic without requiring math knowledge
- Given the output description, when an investor asks "what do I get?", then the text explains the Signal as a personal profile, not just a vector
```

`REQ-F-coherence-index-defined.md`:
```markdown
# REQ-F-coherence-index-defined: Coherence Index H is Defined With Range and Interpretation

**Type**: Functional
**Status**: Draft
**Priority**: Should-have
**Source**: [US-investor-coherence-index](../user-stories/US-investor-coherence-index.md)
**Source stakeholder**: [STK-investor](../stakeholders.md), [STK-marc](../stakeholders.md)

## Description
The Coherence Index (H) currently displayed as "H: 0.9421" in the top-right corner must be accompanied by a definition: H ∈ [0, 1], where high H means the three systems reinforce each other and low H reveals internal tension. If the displayed value is simulated (not computed from real data), this must be indicated.

## Acceptance Criteria
- Given the H indicator is visible, when an investor hovers or looks nearby, then a tooltip or adjacent text defines: "Coherence Index (H): measures agreement between the three systems. H=1 = perfect alignment, H=0 = maximum tension"
- Given the current H value is scroll-speed-simulated, when checking for honesty, then the display is labeled as "simulated" or "demo" — not presented as a live calculation
```

**Step 2: Update 3 user story files with Derived Requirements links**

**Step 3: Add 4 requirements to Requirements Index**

**Step 4: Commit**

```bash
git add 1-spec/requirements/REQ-F-source-attribution-all-figures.md \
       1-spec/requirements/REQ-F-fufire-formula-correct.md \
       1-spec/requirements/REQ-F-fufire-plain-language.md \
       1-spec/requirements/REQ-F-coherence-index-defined.md \
       1-spec/user-stories/US-investor-*.md \
       1-spec/CLAUDE.spec.md
git commit -m "spec: 4 requirements for GOAL-math-transparency stories"
```

---

### Task 8: Requirements for GOAL-persona-market-proof (3 stories → 4 requirements)

**Files:**
- Create: `1-spec/requirements/REQ-F-persona-cards-section.md`
- Create: `1-spec/requirements/REQ-F-segment-contrast-display.md`
- Create: `1-spec/requirements/REQ-F-unit-economics-display.md`
- Create: `1-spec/requirements/REQ-F-pricing-tiers-display.md`
- Modify: `1-spec/CLAUDE.spec.md`, 3 user story files

**Requirement summaries (create full files following template pattern):**

`REQ-F-persona-cards-section`: New page section with 4 persona cards. Each card: archetype name, age/profession/city/income, why they use BAZODIAC (as thinking tool), monetization role. Must include persona matrix table mapping roles to tiers. Source: US-investor-sees-personas.

`REQ-F-segment-contrast-display`: Explicit visual comparison of BAZODIAC target segment vs. Co-Star entertainment segment. Must show: different motivations, different WTP, different retention drivers. Must include at least 2 external data points. Source: US-investor-segment-contrast.

`REQ-F-unit-economics-display`: Display preliminary unit economics: CAC (<€3), LTV (€35–50), retention (7–10 months), conversion targets. All labeled "preliminary — to be validated in 90-day cycle." Source: US-investor-unit-economics.

`REQ-F-pricing-tiers-display`: Display 3-tier pricing model (Free €0 / Essentials €4.99 / Premium €9.99) with feature breakdown per tier. Include benchmark comparison (Cosmic Fusion $39.99/year, Headspace €69.99/year). Source: US-investor-unit-economics.

**Commit:**
```bash
git commit -m "spec: 4 requirements for GOAL-persona-market-proof stories"
```

---

### Task 9: Requirements for GOAL-premium-brand-perception (3 stories → 4 requirements)

**Files:**
- Create: `1-spec/requirements/REQ-USA-deep-tech-first-impression.md`
- Create: `1-spec/requirements/REQ-PERF-canvas-30fps.md`
- Create: `1-spec/requirements/REQ-USA-mobile-premium-experience.md`
- Create: `1-spec/requirements/REQ-PERF-mobile-load-3s.md`
- Modify: `1-spec/CLAUDE.spec.md`, 3 user story files

**Requirement summaries:**

`REQ-USA-deep-tech-first-impression` (Usability): Visual design language must signal technology/fintech before astrology. Dark background (#05070a), gold accents (#D4AF37), monospace for technical content, no zodiac clip art, no pastel gradients, no stock imagery. Source: US-investor-premium-impression.

`REQ-PERF-canvas-30fps` (Performance): All canvas visualizations (ConnectedVortex, ZodiacRing, FuFirE Radar) must maintain ≥30fps on MacBook Air M1 and iPhone 13+. Mobile: scale to 40 nodes max (existing isMobile check). Desktop: 90 nodes. Source: US-investor-interactive-proof.

`REQ-USA-mobile-premium-experience` (Usability): On mobile (≤768px), all content must be legible, properly laid out with no horizontal scroll. No critical sections hidden via `mobile-hide`. Custom cursor hidden. CTA inputs ≥44px height. Source: US-investor-mobile-experience.

`REQ-PERF-mobile-load-3s` (Performance): Page must reach First Contentful Paint within 3 seconds on a 4G connection (~10 Mbps). External CDN dependencies (Tailwind, GSAP) must not block initial render. Source: US-investor-mobile-experience.

**Commit:**
```bash
git commit -m "spec: 4 requirements for GOAL-premium-brand-perception stories

REQ-USA-deep-tech-first-impression, REQ-PERF-canvas-30fps,
REQ-USA-mobile-premium-experience, REQ-PERF-mobile-load-3s"
```

---

### Task 10: Requirements for GOAL-risk-transparency (2 stories → 3 requirements)

**Files:**
- Create: `1-spec/requirements/REQ-F-risk-section-content.md`
- Create: `1-spec/requirements/REQ-F-kpi-kill-criteria-display.md`
- Create: `1-spec/requirements/REQ-F-pivot-plans-display.md`
- Modify: `1-spec/CLAUDE.spec.md`, 2 user story files

**Requirement summaries:**

`REQ-F-risk-section-content`: New page section presenting both critical risks. For each: (1) risk name and one-sentence diagnosis, (2) strategic defense lines (not full detail — summary bullets), (3) link to more detail or expandable content. Must convey risk awareness without overwhelming the page flow. Source: US-investor-sees-risk-framework.

`REQ-F-kpi-kill-criteria-display`: Display at least 3 KPIs per risk with target/warning/kill thresholds in a table or card format. Must include the 90-day validation cycle timeline (Day 0/14/30/60/90). Must state the principle: "Kill criteria committed before launch, cannot be changed." Source: US-investor-sees-risk-framework.

`REQ-F-pivot-plans-display`: Display both pivot scenarios: (1) FuFirE as a Service (B2B API), (2) Volume Pivot (freemium compression). Must communicate asset preservation: "The FuFirE Engine remains valuable in every scenario." Source: US-investor-sees-pivot-plans.

**Commit:**
```bash
git commit -m "spec: 3 requirements for GOAL-risk-transparency stories"
```

---

## Phase 4: Final Sync

### Task 11: Update CLAUDE.md Current State + Goal Requirement Links

**Files:**
- Modify: `CLAUDE.md` (Current State)
- Modify: All 5 goal files (add requirement links to Related Artifacts)
- Modify: `1-spec/CLAUDE.spec.md` (verify all indexes complete)

**Step 1: Update Current State in CLAUDE.md**

Update artifact counts to final:
- Stakeholders: 7
- Goals: 5 Draft
- User Stories: 15 (14 Must-have, 1 Should-have)
- Requirements: ~20 (count after creation)
- Constraints: 8 Active
- Assumptions: 6 Unverified
- Gap analysis: date + "0 Critical, N Important, N Minor" result

**Step 2: Update all 5 goal files — add requirement links**

**Step 3: Final commit**

```bash
git add -A
git commit -m "spec: complete specification phase — all gaps resolved

Final counts: 7 stakeholders, 5 goals, 15 user stories, ~20 requirements,
8 constraints, 6 assumptions. Gap analysis: 0 Critical remaining.
Ready for phase gate transition to Design."
```

```bash
git push
```

---

## Summary

| Phase | Tasks | Requirements Created | Content Fixes |
|-------|-------|---------------------|---------------|
| 1: Content Fixes | 1–2 | 0 | I2 (market figures), I3 ("world's first") |
| 2: Constraint-Implied | 3–5 | 3 | I4 resolved |
| 3: Story-Derived | 6–10 | 17 | C1 resolved |
| 4: Final Sync | 11 | 0 | Traceability + Current State |
| **Total** | **11 tasks** | **~20 requirements** | **3 content fixes** |

After completion: run `/SDLC-status` for full dashboard, then fresh gap analysis to confirm 0 Critical.
