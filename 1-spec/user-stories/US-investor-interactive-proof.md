# US-investor-interactive-proof: Experience Smooth Interactive Visualizations Proving Tech Capability

**As a** prospective investor, **I want** the interactive canvas visualizations (particle vortex, zodiac ring, FuFirE radar) to run smoothly and respond to my cursor/touch, **so that** I experience a tangible proof of technical capability — the team can build real-time computed visuals, not just static mockups.

**Status**: Must-have

**Priority**: Must-have

**Source stakeholder**: [STK-investor](../stakeholders.md), [STK-lena](../stakeholders.md)

**Related goal**: [GOAL-premium-brand-perception](../goals/GOAL-premium-brand-perception.md)

## Acceptance Criteria

- Given I move my cursor over the hero section, when the particle vortex responds to my movement (attraction, tangential force, connecting lines), then I perceive a live, computed system — not a pre-rendered animation or video
- Given I am on a standard laptop (MacBook Air M1 or equivalent), when all canvas elements are active, then the page maintains ≥30fps with no visible jank or frame drops
- Given I am on a phone (iPhone 13+ or equivalent Android), when I touch-interact with the page, then visualizations respond to touch input and gracefully degrade (reduced particle count, simplified effects) without breaking
- Given the page has multiple canvas elements (hero vortex, zodiac ring, FuFirE radar, CTA vortex), when all are in view, then they do not compete for resources in a way that causes visible performance degradation
- Given I have `prefers-reduced-motion` enabled, when I view the page, then canvas elements and film grain are hidden (per existing CSS media query), and the content remains fully accessible

## Derived Requirements

- _none yet_
