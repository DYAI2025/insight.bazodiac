# REQ-F-section-navigation: Minimal Navigation Allows Section Jumping

**Type**: Functional

**Status**: Draft

**Priority**: Should-have

**Source**: [US-investor-narrative-arc](../user-stories/US-investor-narrative-arc.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page should provide minimal navigation (mobile nav dots or sticky anchor links) that allows an investor to jump to a specific section without scrolling through the entire page. The current mobile nav dots exist but only link to 3 sections. All 7 narrative sections should be navigable.

## Acceptance Criteria

- Given the mobile nav at the bottom of the screen, when an investor taps a dot, then the page scrolls to the corresponding section
- Given all 7 sections have `id` attributes, when using URL anchors (e.g., `#market`, `#risk`), then the browser scrolls to the correct section
