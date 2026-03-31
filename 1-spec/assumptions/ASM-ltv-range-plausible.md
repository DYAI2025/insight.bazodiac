# ASM-ltv-range-plausible: €35–50 LTV at 7–10 Months Retention is Realistic

**Category**: Business

**Status**: Unverified

**Risk if wrong**: Medium — if actual LTV is significantly lower (e.g., due to higher churn, lower conversion to paid), the unit economics story for investors breaks down. The subscription model requires sufficient retention to justify CAC investment.

## Statement

A Lifetime Value (LTV) of €35–50 per user is achievable with the premium subscription model (€4.99/month, preliminary), assuming:

- **7–10 months average retention** before churn
- **D30 retention target of 30%** (per Sophia persona's retention mechanics)
- **Premium conversion rate of 5–8%** from free to paid (driven by IKEA effect and quiz investment)
- **Morning Mail transits and Daily Signature Resonance** provide daily engagement hooks that sustain retention

### LTV Calculation (illustrative)

At €4.99/month × 7 months average retention = **€34.93 LTV** (lower bound)
At €4.99/month × 10 months average retention = **€49.90 LTV** (upper bound)

This assumes the €4.99 price point, which is preliminary (see [ASM-preliminary-pricing](ASM-preliminary-pricing.md)).

## Rationale

- The competitive brief projects €35–50 LTV explicitly
- Daily engagement features (Morning Mail, Signature Resonance) create habit loops that support multi-month retention
- The target segment (higher income, higher education) has lower price sensitivity than entertainment-astrology users
- Comparable subscription products: Headspace ($12.99/month, ~12 months LTV), Calm ($14.99/month), astrology apps with premium tiers ($5–15/month range)

## Verification Plan

1. **Beta retention tracking**: Measure D1, D7, D30, D90 retention in first beta cohort
2. **Conversion funnel analysis**: Track free → trial → paid conversion rates by persona segment
3. **Churn analysis**: Identify churn triggers and model average retention months
4. **Revenue cohort analysis**: Calculate actual LTV per cohort after 3+ months of subscription data
5. **Price sensitivity test**: A/B test €4.99 vs. €7.99 vs. €9.99 to find optimal LTV-maximizing price

## Related Artifacts

- [ASM-preliminary-pricing](ASM-preliminary-pricing.md)
- [ASM-cac-under-three](ASM-cac-under-three.md)
- [ASM-framework-segment-higher-wtp](ASM-framework-segment-higher-wtp.md)
- [CON-subscription-not-onetime](../constraints/CON-subscription-not-onetime.md)
