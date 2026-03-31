# CON-single-source-market-data: All Market Figures Must Be Reconciled to One Defensible Set

**Category**: Business

**Status**: Active

**Source stakeholder**: [STK-founder](../stakeholders.md), [STK-investor](../stakeholders.md)

## Description

Across existing BAZODIAC documents, multiple conflicting market figures appear:

| Figure | Source document | Scope |
|--------|----------------|-------|
| $2.2B | Competitive Brief, current insight page | "Astrology market (2025)" — unclear segmentation |
| $9B | Investment Memorandum | "Spiritual Tech" potential by 2030 |
| $12.8B | Persona Dossier | "Astrologie-Gesamtmarkt" |
| $14.3B | Metaphysische Ökonomie analysis | Global astrology total (2024) |
| $4.73B | Metaphysische Ökonomie analysis | Astrology apps segment (2025) |
| $19B | Metaphysische Ökonomie analysis | China spiritual economy (2025) |

And conflicting growth rates:

| CAGR | Source | Scope |
|------|--------|-------|
| ~5.7% | Earlier estimate | General astrology |
| 6.0% | Metaphysische Ökonomie | Global total astrology → $25.6B by 2034 |
| 20.2% | Metaphysische Ökonomie | Astrology apps segment |
| 20% | Investment Memorandum | Digital astrology to $9B |
| 28% | Competitive Brief | Unclear basis |

**These cannot coexist without clear segmentation labels.** An investor who sees "$2.2B" on the page and "$14.3B" in a follow-up deck will question all numbers.

### Recommended Reconciliation

Based on the most sourced data (Metaphysische Ökonomie analysis):

| Metric | Value | Scope | Use on insight page |
|--------|-------|-------|-------------------|
| **$14.3B** | Global astrology total (2024) | Total addressable market (TAM) — all astrology services worldwide |
| **$4.73B** | Astrology apps (2025) | Serviceable addressable market (SAM) — digital/app-based astrology |
| **6.0% CAGR** | Global total | Conservative growth, use for TAM projection |
| **20.2% CAGR** | Apps segment | High-growth segment, use for SAM projection |
| **$25.6B** | Global total by 2034 | TAM projection |
| **$11.7B** | Apps by 2030 | SAM projection |

All figures must name their research source on the page.

## Rationale

Investors perform basic due diligence. Inconsistent market figures across materials signal sloppy research or cherry-picking — both destroy credibility.

## Impact

- The insight page `index.html` currently shows "$2.2B" — must be updated with the reconciled figure set
- All supporting documents (persona dossier, competitive brief, investment memo) should align
- Each market figure on the page must include source attribution (even if as a small footnote or hover tooltip)

## Related Artifacts

- [GOAL-math-transparency](../goals/GOAL-math-transparency.md)
- [CON-no-unattributed-projections](CON-no-unattributed-projections.md)
- [ASM-market-size-defensible](../assumptions/ASM-market-size-defensible.md)
