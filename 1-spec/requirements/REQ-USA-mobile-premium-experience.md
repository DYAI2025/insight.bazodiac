# REQ-USA-mobile-premium-experience: Mobile Layout Preserves Premium Feel

**Type**: Usability

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-mobile-experience](../user-stories/US-investor-mobile-experience.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

On mobile devices (≤768px viewport), all content must be legible, properly laid out with no horizontal scrolling. No critical narrative sections may be hidden via `mobile-hide` classes. Custom cursor effects must be hidden (desktop-only). CTA input fields must be ≥44px height for thumb-friendly interaction. Canvas visualizations must render at reduced but still visually impressive quality.

## Acceptance Criteria

- Given an iPhone or Android flagship, when opening the page in portrait orientation, then no horizontal scroll bar appears and all text is readable without zooming
- Given the narrative arc (7 sections), when scrolling on mobile, then all sections are present — none removed by `mobile-hide` that would break the investor story
- Given the CTA email input, when tapping it on mobile, then the keyboard appears without layout shift and the field height is ≥44px
- Given canvas visualizations on mobile, when scrolling past them, then they render with reduced particle count (40 vs 90) but remain visually recognizable as interactive computed graphics
