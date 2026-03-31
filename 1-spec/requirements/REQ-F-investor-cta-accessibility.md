# REQ-F-investor-cta-accessibility: Investor CTA Reachable From Any Scroll Position

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-clear-ask](../user-stories/US-investor-clear-ask.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must provide an investor-specific call-to-action that is accessible without requiring the user to scroll to the bottom. At minimum: (1) an anchor link in the hero section (e.g., "For Investors →" linking to market/CTA section), (2) a primary CTA form in the final section with email input and submit button, (3) visible confirmation after form submission.

## Acceptance Criteria

- Given the hero section, when an investor looks for a next step, then a visible link labeled "For Investors" or equivalent points to the market/opportunity section
- Given the final CTA section, when an investor submits their email, then a visible confirmation message appears (not a silent submit or page reload)
- Given a mobile device, when the CTA form is used, then input fields are at least 44px tall (thumb-friendly), keyboard appears without layout shift, and the submit button is reachable without scrolling past the input
