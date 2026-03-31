# REQ-PERF-mobile-load-3s: Page Reaches FCP Within 3 Seconds on 4G

**Type**: Performance

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-mobile-experience](../user-stories/US-investor-mobile-experience.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must reach First Contentful Paint (FCP) within 3 seconds on a 4G mobile connection (~10 Mbps). External CDN dependencies (Tailwind CSS, GSAP) must not block initial render of hero text content. Total page weight should remain under 500KB for initial load (excluding canvas rendering).

## Acceptance Criteria

- Given a simulated 4G connection (Chrome DevTools Network throttling: 10 Mbps down, 3 Mbps up, 20ms RTT), when loading the page from cold cache, then FCP is ≤3000ms
- Given the page loads, when the hero section appears, then the BAZODIAC title and subtitle are visible before external scripts (GSAP, Tailwind) have fully loaded
- Given total transfer size, when measured via Chrome DevTools Network tab, then initial page load (HTML + CSS + JS, excluding images) is under 500KB
