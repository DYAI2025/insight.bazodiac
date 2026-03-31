# REQ-F-fufire-formula-correct: FuFirE Formula is Mathematically Correct and Verifiable

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-understands-fufire](../user-stories/US-investor-understands-fufire.md)

**Source stakeholder**: [STK-investor](../stakeholders.md), [STK-marc](../stakeholders.md)

## Description

The Signal formula `Signal(s) = 0.375·W(s) + 0.375·B(s) + 0.25·X(s)` must be displayed with mathematically correct properties: weights sum to 1.0 (convex combination), dimensional claims (R⁵ for 5 elements, S⁴ for unit sphere in 5D) are accurate, and L2-normalization is correctly described.

## Acceptance Criteria

- Given the formula is displayed, when summing the weights, then 0.375 + 0.375 + 0.25 = 1.000
- Given the text claims "R⁵ space", when a mathematician reviews it, then it correctly corresponds to 5 elements (Wood, Fire, Earth, Metal, Water) as vector dimensions
- Given the text claims "S⁴ sphere", when verified, then S⁴ is correctly the unit sphere in R⁵ (n-sphere in n+1 dimensions)
- Given the formula section, when searching for mythopoetic terms, then zero instances of "Obsidian Core", "Neural Mycelium", or "Bioluminescent Membrane" are found
