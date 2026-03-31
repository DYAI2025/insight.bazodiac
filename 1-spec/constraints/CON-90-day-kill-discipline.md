# CON-90-day-kill-discipline: Non-Negotiable 90-Day Validation Cycle with Kill Criteria

**Category**: Business

**Status**: Active

**Source stakeholder**: [STK-founder](../stakeholders.md), [STK-investor](../stakeholders.md)

## Description

Both critical assumptions ([ASM-fufire-substance-over-cosmic-ux](../assumptions/ASM-fufire-substance-over-cosmic-ux.md) and [ASM-framework-segment-higher-wtp](../assumptions/ASM-framework-segment-higher-wtp.md)) are tested in a **synchronized 90-day validation cycle** starting at DACH launch. The cycle follows a fixed rhythm with pre-committed kill criteria that **cannot be changed during the cycle**.

### Decision Protocol

| Day | Action | Decision at Warning | Decision at Kill |
|-----|--------|-------------------|-----------------|
| **0** | DACH launch with 3-tier model. Analytics setup. Baseline measurement. | — | — |
| **14** | Review first early warning signals. Onboarding funnel analysis. | UX iteration. A/B test new onboarding flows. | Too early — no kill before Day 30. |
| **30** | **Review 1**: Retention + trial starts + paywall metrics. | Pricing experiment (raise/lower). Companion optimization. | Escalation: Emergency retro. Start Plan B preparation. |
| **60** | **Review 2**: Churn + ARPU + DE vs. EN split. | Adjust feature priority. Change marketing mix. | Formal: Draft pivot scenario. Inform board. |
| **90** | **KILL/CONTINUE decision. Mandatory meeting.** | Final iteration. 30 more days with changed strategy. | **PIVOT EXECUTED. No delay.** |

### Decision Principle

> Kill criteria are committed **in writing before launch** and cannot be changed during the cycle. This prevents the "just one more month" bias that kills startups.

> When Day 90 arrives and the data is in the kill zone: **pivot. Not discussed. Not postponed. Executed.**

### Asset Preservation

The technology remains valuable in every scenario — as consumer backend, as B2B API, or as basis for a changed business model. **The FuFirE Engine is not a lost asset. Only the packaging changes.**

## Rationale

Investors need to see that the founding team:
1. **Identifies risks honestly** — not just strengths
2. **Quantifies the risks** — with specific KPIs, not vague "we'll monitor it"
3. **Pre-commits to consequences** — kill criteria that force action, not endless iteration
4. **Has fallback plans** — FaaS (B2B API), volume pivot, tier compression

This discipline is the difference between a credible startup and a founder who "believes in the vision" past the point of rationality.

## Impact

- The insight page must communicate this validation discipline to investors (see [GOAL-risk-transparency](../goals/GOAL-risk-transparency.md))
- Kill criteria and KPI targets must be agreed with investors before launch
- Analytics infrastructure (Mixpanel, RevenueCat) must be instrumented from Day 0
- Day 30/60/90 review meetings are mandatory calendar entries, not optional

## Related Artifacts

- [ASM-fufire-substance-over-cosmic-ux](../assumptions/ASM-fufire-substance-over-cosmic-ux.md)
- [ASM-framework-segment-higher-wtp](../assumptions/ASM-framework-segment-higher-wtp.md)
- [GOAL-risk-transparency](../goals/GOAL-risk-transparency.md)
- [GOAL-investor-conviction](../goals/GOAL-investor-conviction.md)
