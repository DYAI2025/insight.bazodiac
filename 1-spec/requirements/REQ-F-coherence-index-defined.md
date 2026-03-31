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
