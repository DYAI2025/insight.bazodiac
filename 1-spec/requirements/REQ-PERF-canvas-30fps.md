# REQ-PERF-canvas-30fps: Canvas Visualizations Maintain ≥30fps

**Type**: Performance

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-interactive-proof](../user-stories/US-investor-interactive-proof.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

All canvas visualizations (ConnectedVortex, ZodiacRing, FuFirE Radar) must maintain ≥30fps on reference hardware. Desktop: MacBook Air M1 with 90 particle nodes. Mobile: iPhone 13+ with 40 particle nodes (existing `isMobile` scaling). Multiple simultaneous canvases must not cause cumulative frame drops below 30fps.

## Acceptance Criteria

- Given a MacBook Air M1 with Chrome/Safari, when all canvas elements are active and cursor is moving, then measured fps (via Chrome DevTools Performance tab) is ≥30fps sustained
- Given an iPhone 13 with Safari, when scrolling through canvas sections, then no visible jank or frame stutter occurs
- Given `prefers-reduced-motion` is enabled, when viewing the page, then canvas elements are hidden (existing CSS rule) and content remains accessible
