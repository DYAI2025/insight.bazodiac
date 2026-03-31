# REQ-F-replace-overclaiming-language: Audit and Replace Prohibited Language Patterns

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [CON-no-overclaiming](../constraints/CON-no-overclaiming.md)

**Source stakeholder**: [STK-founder](../stakeholders.md), [STK-investor](../stakeholders.md)

## Description

The `index.html` file must not contain any of the prohibited patterns defined in CON-no-overclaiming: unverified superlatives ("only engine worldwide", "world's first" without prior art verification, "technological market leader") or mythopoetic marketing terms in technical contexts ("Obsidian Core", "Neural Mycelium", "Bioluminescent Membrane", "Soul Signature", "Digital Organism").

## Acceptance Criteria

- Given a text search of `index.html`, when searching for the prohibited terms listed in CON-no-overclaiming, then zero matches are found
- Given the FuFirE Engine section describes the architecture, when technical layers are named, then they use engineering terms: "Deterministic Calculation Layer", "Modulation Layer", "Visualization Layer"
- Given market claims appear on the page, when checking for superlatives, then every claim is either (a) sourced, (b) derived with stated method, or (c) labeled as preliminary

## Related Constraints

- [CON-no-overclaiming](../constraints/CON-no-overclaiming.md)
