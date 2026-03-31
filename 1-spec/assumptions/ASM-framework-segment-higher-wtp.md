# ASM-framework-segment-higher-wtp: Framework-Curious Segment Has Higher Willingness to Pay

**Category**: Business

**Status**: Unverified

**Risk if wrong**: High — if this segment doesn't exist or doesn't pay more than Cosmic Fusion's $39.99/year, the entire premium subscription model collapses and unit economics go negative.

## Statement

The agnostic, semi-spiritual, framework-curious user segment (Lena, Marc, Sophia, Kai) has a **significantly higher willingness to pay** for identity-framework tools compared to the entertainment-astrology segment.

## Diagnosis: The Unknown Segment

The honest truth: **there is no reliable market data** proving that a "framework-curious" segment with higher WTP exists in astrology specifically.

What we know:
- Headspace/Calm proved users pay $60–70/year for mindfulness tools
- MBTI tests cost $49.95 per assessment
- Enneagram coaches charge $100–200/session
- The segment "people who take structured self-knowledge frameworks seriously" exists

The question is: **will they accept astrology as such a framework?**

The male demographic (28–45, rational, framework-oriented) is the key — and simultaneously the biggest risk. This group potentially pays for a precise tool, but also has the highest skepticism threshold toward astrology in general.

## Strategic Defense: Tiered Validation

Instead of testing a single premium price point, the WTP hypothesis is validated granularly across three tiers. Each tier tests a specific sub-hypothesis:

| Tier | Features | Price | Sub-Hypothesis | Benchmark |
|------|----------|-------|----------------|-----------|
| **Free** | 144 combinations, basic chart, 1x Victoria daily | €0 | Is Free sufficient for acquisition? | Cosmic Fusion Free |
| **Essentials** | Full 4-Pillar BaZi, Wu-Xing distribution, Victoria unlimited, Synastry | €4.99/month (€49.99/year) | Does anyone pay for BaZi depth? | CF: $39.99/year |
| **Premium** | Levi Voice Coaching, Fusion Ring, real-time transits, priority support | €9.99/month (€89.99/year) | Does premium WTP exist? | Headspace: €69.99/year |

**Advantage**: If Essentials converts but Premium doesn't → we know exactly where WTP ends. If Free converts but Essentials doesn't → the segment is entertainment-only and the premium thesis is falsified.

### DACH-Specific Price Sensitivity

The DACH market has higher general WTP for wellness apps than the US (Headspace DE outperforms), but simultaneously higher skepticism toward astrology. The bilingual strategy enables A/B tests between EN and DE users to measure whether German localization actually increases conversion.

## Early Warning Signals (Pre-Day 90)

| Day | Signal | Positive | Negative |
|-----|--------|----------|----------|
| 7 | Paywall impression-to-tap | ≥ 12% tap on pricing | < 5% — price interest doesn't exist |
| 14 | Trial start rate (Essentials) | ≥ 8% start trial | < 3% — feature set doesn't convince |
| 30 | Trial-to-paid conversion | ≥ 25% convert | < 10% — WTP exists but price is wrong |
| 60 | Churn after first month | < 20% churn | > 40% — perceived value drops after novelty |

## Measurable KPIs and Trigger Points

| KPI | Target (90d) | Warning | Kill | Source |
|-----|-------------|---------|------|--------|
| Free → Essentials Conversion | ≥ 5% | < 3% | < 1.5% | RevenueCat / Store |
| Free → Premium Conversion | ≥ 2% | < 1% | < 0.5% | RevenueCat / Store |
| ARPU (all users) | ≥ €0.80/month | < €0.50 | < €0.25 | Revenue / MAU |
| Essentials M1 Churn | < 25% | > 35% | > 50% | RevenueCat |
| Premium M1 Churn | < 20% | > 30% | > 45% | RevenueCat |
| DE vs. EN Conversion Delta | DE ≥ EN +20% | DE = EN (±10%) | DE < EN −20% | A/B Test Split |

## Kill Criterion

**KILL: Premium WTP hypothesis falsified**

**Condition**: After 90 days in DACH market with ≥ 2,000 organic installs, Free-to-Essentials conversion is below 1.5% AND ARPU is below €0.25/month.

**Consequence**: Volume Pivot.
1. Switch to pure freemium model à la Cosmic Fusion (€2.99/week, €39.99/year)
2. All premium features compressed into a single tier
3. Monetization via volume instead of premium WTP
4. Parallel: In-app purchases for individual reports (Synastry Match €0.99, Annual Preview €4.99)

**Responsible**: Product Owner + Business Lead. Review meeting at Day 90 is mandatory. Interim reviews at Day 30 and Day 60 document trend.

## Verification Plan

1. **Pre-launch**: WTP survey targeting Lena/Marc/Sophia/Kai demographics in DACH
2. **Pre-launch**: Comparable pricing analysis (MBTI, Enneagram, Human Design, Headspace, Cosmic Fusion)
3. **Launch + 7d**: Paywall tap rate analysis
4. **Launch + 14d**: Trial start rate by tier
5. **Launch + 30d**: Trial-to-paid conversion + first churn data
6. **Launch + 60d**: ARPU + DE vs. EN split
7. **Launch + 90d**: KILL/CONTINUE decision (mandatory, non-negotiable)

## Related Artifacts

- [ASM-preliminary-pricing](ASM-preliminary-pricing.md)
- [ASM-ltv-range-plausible](ASM-ltv-range-plausible.md)
- [CON-subscription-not-onetime](../constraints/CON-subscription-not-onetime.md)
- [CON-90-day-kill-discipline](../constraints/CON-90-day-kill-discipline.md)
- [GOAL-persona-market-proof](../goals/GOAL-persona-market-proof.md)
- [GOAL-risk-transparency](../goals/GOAL-risk-transparency.md)
