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
