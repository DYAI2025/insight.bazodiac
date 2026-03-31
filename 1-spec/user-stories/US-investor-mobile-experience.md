# US-investor-mobile-experience: View the Page on a Phone Without Degraded Experience

**As a** prospective investor, **I want** the insight page to deliver a premium experience on my phone (likely checking it in a taxi, at dinner, or between meetings), **so that** I can share the link with partners and co-investors knowing it will impress on any device.

**Status**: Must-have

**Priority**: Must-have

**Source stakeholder**: [STK-investor](../stakeholders.md)

**Related goal**: [GOAL-premium-brand-perception](../goals/GOAL-premium-brand-perception.md)

## Acceptance Criteria

- Given I open the page on an iPhone (Safari) or Android flagship (Chrome), when the page loads, then all content is legible, properly laid out, and no horizontal scrolling is required
- Given I am on a phone, when I scroll through all sections, then the narrative arc is preserved — no sections are hidden behind "mobile-hide" classes that break the story flow for investors
- Given I am on a phone, when I see canvas visualizations, then they render at reduced but still visually impressive quality (40 particles instead of 90, per existing `isMobile` scaling)
- Given I want to submit my email via the CTA form, when I tap the input field, then the keyboard appears without layout shift, the input is large enough for thumb entry, and the submit button is reachable
- Given I am on a phone, when I look for the custom cursor effects, then they are gracefully hidden (cursor effects are desktop-only) and do not cause touch interaction issues
- Given I share the URL via iMessage/WhatsApp, when the recipient opens it, then the page loads within 3 seconds on a 4G connection

## Derived Requirements

- [REQ-USA-mobile-premium-experience](../requirements/REQ-USA-mobile-premium-experience.md)
- [REQ-PERF-mobile-load-3s](../requirements/REQ-PERF-mobile-load-3s.md)
