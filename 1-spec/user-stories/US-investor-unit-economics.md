# US-investor-unit-economics: See Preliminary Unit Economics Per Persona Tier

**As a** prospective investor, **I want** to see the preliminary unit economics (CAC, LTV, conversion rates, churn targets) broken down by persona segment and pricing tier, **so that** I can evaluate whether the business model is viable and where the economic risk lies.

**Status**: Must-have

**Priority**: Must-have

**Source stakeholder**: [STK-investor](../stakeholders.md)

**Related goal**: [GOAL-persona-market-proof](../goals/GOAL-persona-market-proof.md)

## Acceptance Criteria

- Given I want to evaluate the business model, when I find the unit economics section, then I see the three-tier pricing model:
  - Free (€0): 144 combinations, basic chart, 1x Victoria daily
  - Essentials (€4.99/month): Full BaZi, Wu-Xing, Victoria unlimited, Synastry
  - Premium (€9.99/month): Levi Voice, Fusion Ring, real-time transits
- Given I want to see the revenue model, when I review the economics, then I see: CAC target (<€3), LTV range (€35–50), target retention (7–10 months), conversion targets (Free→Essentials ≥5%, Free→Premium ≥2%)
- Given I want to assess risk, when I check the numbers, then all unit economics are explicitly labeled as "preliminary projections — to be validated in 90-day cycle" (per CON-no-unattributed-projections and ASM-preliminary-pricing)
- Given I want to compare to benchmarks, when I see the pricing, then there is at least one benchmark comparison (e.g., Cosmic Fusion $39.99/year, Headspace €69.99/year)

## Derived Requirements

- [REQ-F-unit-economics-display](../requirements/REQ-F-unit-economics-display.md)
- [REQ-F-pricing-tiers-display](../requirements/REQ-F-pricing-tiers-display.md)
