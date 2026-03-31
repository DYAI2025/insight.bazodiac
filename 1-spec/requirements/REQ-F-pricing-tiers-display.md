# REQ-F-pricing-tiers-display: Display Three-Tier Pricing Model With Feature Breakdown

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-unit-economics](../user-stories/US-investor-unit-economics.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must display the three-tier subscription model with features per tier, validating the tiered WTP hypothesis from ASM-framework-segment-higher-wtp:

| Tier | Price | Key Features |
|------|-------|-------------|
| Free | €0 | 144 combinations, basic chart, 1x Victoria daily |
| Essentials | €4.99/month (€49.99/year) | Full 4-Pillar BaZi, Wu-Xing distribution, Victoria unlimited, Synastry |
| Premium | €9.99/month (€89.99/year) | Levi Voice Coaching, Fusion Ring, real-time transits, priority support |

All prices must be labeled as "preliminary benchmark — to be validated with investor input."

## Acceptance Criteria

- Given the pricing section, when an investor views it, then all three tiers are visible with price, name, and feature list
- Given price labels, when checking for disclaimers, then text states "preliminary benchmark" or equivalent
- Given the tier structure, when compared to ASM-framework-segment-higher-wtp, then each tier maps to its sub-hypothesis (Free=acquisition, Essentials=BaZi depth WTP, Premium=premium WTP exists)

## Related Assumptions

- [ASM-framework-segment-higher-wtp](../assumptions/ASM-framework-segment-higher-wtp.md)
- [ASM-preliminary-pricing](../assumptions/ASM-preliminary-pricing.md)
