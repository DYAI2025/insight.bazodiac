# REQ-F-source-attribution-all-figures: Every Numerical Claim Has Visible Source Attribution

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-verifiable-market-claims](../user-stories/US-investor-verifiable-market-claims.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

Every market size, CAGR, demographic percentage, and financial projection displayed on the page must have visible source attribution within 50px of the number. Attribution format: research firm name + publication year (e.g., "Source: Precedence Research, 2024"). Preliminary estimates must be labeled "preliminary estimate — to be validated."

## Acceptance Criteria

- Given any `.data-number` element or inline statistic, when visually inspecting its vicinity, then source attribution text is present in a smaller font
- Given subscription pricing is displayed, when checking its framing, then it is labeled as "preliminary benchmark" or equivalent
- Given total count of numerical claims on the page, when auditing for attribution, then 100% have either a named source or an explicit "estimate" label
