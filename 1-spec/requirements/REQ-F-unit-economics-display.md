# REQ-F-unit-economics-display: Display Preliminary Unit Economics With Benchmarks

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-unit-economics](../user-stories/US-investor-unit-economics.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must display preliminary unit economics: CAC target (<€3), LTV range (€35–50), retention target (7–10 months), conversion targets (Free→Essentials ≥5%, Free→Premium ≥2%). All figures must be explicitly labeled as "preliminary projections — to be validated in 90-day cycle." Must include at least one benchmark comparison (e.g., Cosmic Fusion $39.99/year, Headspace €69.99/year).

## Acceptance Criteria

- Given the unit economics are visible, when an investor reads them, then CAC, LTV, retention, and conversion targets are all present
- Given any economic figure, when checking its labeling, then it is marked as "preliminary" or "projection" — not presented as validated data
- Given the pricing model, when an investor reviews it, then the 3-tier structure is shown: Free (€0), Essentials (€4.99/month), Premium (€9.99/month) with feature breakdown
- Given benchmark data, when comparing BAZODIAC pricing, then at least Cosmic Fusion ($39.99/year) and one wellness benchmark (Headspace/Calm) are cited

## Related Assumptions

- [ASM-preliminary-pricing](../assumptions/ASM-preliminary-pricing.md)
- [ASM-cac-under-three](../assumptions/ASM-cac-under-three.md)
- [ASM-ltv-range-plausible](../assumptions/ASM-ltv-range-plausible.md)
