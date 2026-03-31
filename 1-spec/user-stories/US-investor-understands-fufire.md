# US-investor-understands-fufire: See the Fusion Formula With Correct, Explained Math

**As a** prospective investor, **I want** to see the FuFirE engine's core formula presented with correct mathematics and a brief explanation of what each component means, **so that** I understand the technical differentiation without needing a math degree, and so that technically literate advisors can verify the claims.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-investor](../stakeholders.md), [STK-marc](../stakeholders.md)

**Related goal**: [GOAL-math-transparency](../goals/GOAL-math-transparency.md)

## Acceptance Criteria

- Given I see the formula `Signal(s) = 0.375·W(s) + 0.375·B(s) + 0.25·X(s)`, when I check the weights, then they sum to exactly 1.0 (convex combination)
- Given I see "R⁵ space" and "S⁴ sphere", when a technical advisor reviews them, then the dimensional claims are mathematically correct (5 elements → 5D vectors; unit sphere in 5D = S⁴)
- Given I am a non-technical investor, when I read the formula section, then there is a plain-language explanation alongside the math: what W, B, X represent, why the weights are set as they are, and what the output Signal means in practical terms
- Given I want to understand the three input systems, when I read the section, then each system (Western Astrology, BaZi, Wu-Xing) has a one-line description of what it contributes and why it's weighted as shown
- Given I see technical terms, when I scan for mythopoetic language, then I find engineering terms only — no "Obsidian Core", "Neural Mycelium", or "Bioluminescent Membrane" (per CON-no-overclaiming)

## Derived Requirements

- [REQ-F-fufire-formula-correct](../requirements/REQ-F-fufire-formula-correct.md)
- [REQ-F-fufire-plain-language](../requirements/REQ-F-fufire-plain-language.md)
