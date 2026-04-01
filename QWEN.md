# QWEN.md — Project Context for insight.bazodiac

## Project Overview

**insight.bazodiac** is a premium investor-facing preview page for **BAZODIAC** — the world's first mathematical fusion of Western Astrology, Chinese BaZi, and Wu-Xing into a single, auditable signal. The site lives at [bazodiac.space](https://bazodiac.space) and functions as a confidential pitch experience designed to move investors from curiosity to conviction in a single scroll.

### Core Value Proposition

- **Market**: $2.2B digital astrology market (2025), growing at ~5.7% CAGR — zero computational competitors
- **Product**: FuFirE Engine computes a personal Signal by fusing three ancient systems with transparent mathematics
- **Formula**: `Signal(s) = 0.375·W(s) + 0.375·B(s) + 0.25·X(s)` — L2-normalized onto S⁴ unit sphere
- **Differentiation**: Chinese BaZi (practiced by 1B+ in East Asia) has 0% structured penetration in Western digital markets

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Pure HTML5, CSS3, Vanilla JavaScript |
| Styling | Tailwind CSS (CDN) + custom CSS (gold-leaf luxury design) |
| Animations | GSAP 3.12.2 + ScrollTrigger |
| Visualizations | HTML5 Canvas (custom engine: `engine.js`) |
| Hosting | Static site (Vercel/Netlify/Fly — configurable) |

### Project Structure

```
insight.bazodiac/
├── index.html              # Main investor pitch page (7-section narrative)
├── engine.js               # Canvas visualization engine (vortex, rings, radar)
├── interactions.js         # GSAP scroll-triggered animations
├── styles.css              # Gold-leaf luxury design system
├── investor.js             # Investor-specific interactions
├── investor.css            # Investor-specific styles
├── *.html                  # Sub-pages (architecture, audience, competition, etc.)
│
├── 1-spec/                 # Specification phase (WHAT & WHY)
│   ├── stakeholders.md     # 7 stakeholders, 4 personas
│   ├── goals/              # 5 goals (Must-have priority)
│   ├── user-stories/       # 15 user stories
│   ├── requirements/       # 23 requirements (8 functional, 2 performance, 1 usability)
│   ├── constraints/        # 8 active constraints
│   ├── assumptions/        # 6 assumptions (2 HIGH risk)
│   └── CLAUDE.spec.md      # Phase-specific instructions
│
├── 2-design/               # Design phase (HOW)
│   ├── architecture.md     # System architecture (empty until Design phase)
│   ├── data-model.md       # Data structures (empty until Design phase)
│   ├── api-design.md       # API contracts (empty until Design phase)
│   └── CLAUDE.design.md    # Phase-specific instructions
│
├── 3-code/                 # Code phase (BUILD)
│   ├── tasks.md            # Task tracker (13/13 tasks done — Paid API Readiness)
│   └── CLAUDE.code.md      # Phase-specific instructions
│
├── 4-deploy/               # Deploy phase (SHIP)
│   └── CLAUDE.deploy.md    # Phase-specific instructions (not yet created)
│
├── decisions/              # Architecture Decision Records
│   ├── _template.md        # Decision record template
│   ├── _template.history.md
│   └── PROCEDURES.md       # Decision recording/deprecation procedures
│
├── .claude/                # AI SDLC Scaffold skills
│   └── skills/             # SDLC automation skills (init, elicit, design, etc.)
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
│
└── docs/                   # Additional documentation
```

## Current State

| Phase | Status | Details |
|-------|--------|---------|
| **Specification** | ✅ Complete | 7 stakeholders, 5 goals, 15 user stories, 23 requirements, 8 constraints, 6 assumptions |
| **Design** | 🟡 In Progress | Architecture/data-model/api-design files empty awaiting Design phase kickoff |
| **Code** | ✅ Paid API Ready | 13/13 tasks complete, OpenAPI spec generated, 1631 tests passing |
| **Deploy** | ⏳ Pending | Static site live at bazodiac.space |

### Gap Analysis (2026-03-31)

- **Critical**: 0
- **Important**: 3 (cosmetic)
- **Minor**: 4

### Next Step

Continue `/SDLC-elicit` — define user stories and requirements for each goal, or advance to Design phase gate.

---

## Building and Running

### Local Development

```bash
# Simple static file server (any of these work)
python -m http.server 8000
npx serve .
npx live-server
```

Then open `http://localhost:8000` in your browser.

### Dependencies

No npm/package.json — all dependencies loaded via CDN:

- Tailwind CSS: `https://cdn.tailwindcss.com`
- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- GSAP ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js`

### Environment Configuration

```bash
# Copy .env.example to .env
cp .env.example .env

# Configure as needed (mostly for deployment)
# OPENAI_API_KEY=
# ANTHROPIC_API_KEY=
# DEPLOY_TARGET=vercel|netlify|fly
# DEPLOY_URL=
# ENABLE_ANALYTICS=false
# ENABLE_PAID_API=false
```

### Deployment

```bash
# Check GitHub Actions workflow for CI/CD
cat .github/workflows/deploy.yml

# Deploy target is configured via DEPLOY_TARGET in .env
```

---

## Development Conventions

### AI SDLC Scaffold

This project uses the [AI SDLC Scaffold](https://github.com/DYAI2025/ai-scrum-scaffold) for structured, AI-first development. Key skills:

| Skill | Purpose |
|-------|---------|
| `/SDLC-init` | Project initialization |
| `/SDLC-elicit` | Requirements elicitation |
| `/SDLC-design` | Architecture & design |
| `/SDLC-decompose` | Component identification |
| `/SDLC-implementation-plan` | Task generation |
| `/SDLC-execute-next-task` | Task execution |
| `/SDLC-fix` | Bug fixes & ad-hoc changes |
| `/SDLC-status` | Project dashboard |

### Artifact Naming

All artifacts use the pattern `PREFIX-kebab-name`:

| Prefix | Type | Location |
|--------|------|----------|
| `GOAL` | Goals | `1-spec/goals/` |
| `US` | User Stories | `1-spec/user-stories/` |
| `REQ` | Requirements | `1-spec/requirements/` |
| `ASM` | Assumptions | `1-spec/assumptions/` |
| `CON` | Constraints | `1-spec/constraints/` |
| `STK` | Stakeholders | `1-spec/stakeholders.md` |
| `TASK` | Tasks | `3-code/tasks.md` |
| `DEC` | Decisions | `decisions/` |

### Status Lifecycles

| Artifact | Lifecycle |
|----------|-----------|
| Goal | `Draft → Approved → Achieved → Deprecated` |
| User Story | `Draft → Approved → Implemented → Deprecated` |
| Requirement | `Draft → Approved → Implemented → Deprecated` |
| Assumption | `Unverified → Verified | Invalidated` |
| Constraint | `Active → Lifted` |
| Decision | `Active → Deprecated | Superseded` |

### Phase Gates

| Transition | Preconditions |
|------------|---------------|
| Spec → Design | Stakeholders defined; ≥1 goal Approved; ≥1 requirement Approved; gap analysis fresh (no Critical gaps) |
| Design → Code | All design docs drafted; completeness assessment fresh; components identified |

### Coding Style

- **JavaScript**: ES6+ classes, const/let preferred over var, arrow functions for callbacks
- **CSS**: CSS custom properties (`--variable-name`), BEM-like naming, mobile-first responsive design
- **HTML**: Semantic sections with ARIA labels, noindex/nofollow for confidentiality

### Testing Practices

- Backend tests (FuFirE engine): 1631 tests passing (Python/pytest)
- Frontend: Manual testing on MacBook Air M1 / iPhone 13+ for 30fps canvas performance
- Performance targets: FCP ≤3s on 4G, initial load <500KB

### Key Constraints

1. **Static frontend only** — pure client-side HTML/CSS/JS, no backend
2. **No overclaiming** — FuFirE has Overconfidence + Complexity Bias; mythopoetic language prohibited
3. **Cosmic Fusion incumbent** — must acknowledge, position against, present attack strategy
4. **Single-source market data** — $14.3B total, $4.73B apps, CAGR 6%/20.2% (reconciled figures only)
5. **90-day kill discipline** — pre-committed validation cycle with non-negotiable kill criteria

### Target Personas

| Persona | Role | Monetization |
|---------|------|--------------|
| **Lena** (28, UX designer) | Brand standard-setter | Mid (subscription) |
| **Marc** (34, strategy consultant) | Revenue anchor | High (subscription + B2B API) |
| **Sophia** (26, psychology student) | Retention engine | Mid (subscription LTV) |
| **Kai** (early 20s, identity-curious) | Acquisition funnel | Growth (free → upsell) |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| [`CLAUDE.md`](CLAUDE.md) | Root AI instructions, language policy, project overview |
| [`README.md`](README.md) | High-level project summary |
| [`index.html`](index.html) | 7-section investor pitch narrative (Hero→Problem→Product→Proof→Opportunity→Risk→Ask) |
| [`engine.js`](engine.js) | ConnectedVortex class, canvas visualization engine |
| [`interactions.js`](interactions.js) | GSAP ScrollTrigger animations, scroll-driven interactions |
| [`styles.css`](styles.css) | Gold-leaf luxury design system, CSS custom properties |
| [`1-spec/CLAUDE.spec.md`](1-spec/CLAUDE.spec.md) | Specification phase instructions, artifact indexes |
| [`3-code/tasks.md`](3-code/tasks.md) | Task tracker (Paid API Readiness: 13/13 done) |
| [`decisions/PROCEDURES.md`](decisions/PROCEDURES.md) | Decision recording/deprecation procedures |

---

## Related Projects

- **sky.bazodiac.space** — NASA DONKI data integration (referenced for STK-Lena credibility)
- **FuFirE Engine** — Backend Python API (1631 tests passing, OpenAPI spec generated)

---

## Notes for AI Agents

1. **Read phase-specific CLAUDE.*.md files** before working in a phase directory
2. **Check decisions index** in the relevant phase file for active decisions
3. **Maintain traceability** — requirements link to user stories link to goals link to stakeholders
4. **Surface conflicts** — never resolve requirement conflicts silently; present options to user
5. **Respect phase gates** — warn if preconditions not met before advancing phases
6. **No mythopoetic language** — prohibited terms: "Obsidian Core", "Neural Mycelium", "Bioluminescent Membrane"
7. **All outputs in English** — per language policy in CLAUDE.md
