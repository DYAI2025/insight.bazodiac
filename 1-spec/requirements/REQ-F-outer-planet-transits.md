# REQ-F-outer-planet-transits: Outer Planets in Transit Calculations

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-full-transit-planets](../user-stories/US-full-transit-planets.md)

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

## Description

Add Uranus, Neptune, and Pluto to `TRANSIT_PLANETS` in `transit.py` and assign them appropriate weights in `PLANET_WEIGHTS` reflecting their slow orbital speed and astrological significance:

| Planet | Weight | Rationale |
|--------|--------|-----------|
| Uranus | 1.5 | 84-year orbit, generational influence |
| Neptune | 1.8 | 165-year orbit, deep psychic influence |
| Pluto | 2.0 | 248-year orbit, transformative power |

## Acceptance Criteria

- Given `GET /transit/now`, when the response is received, then `planets` dict contains keys `uranus`, `neptune`, `pluto`
- Given each outer planet entry, when inspecting the data, then `longitude`, `sector`, `sign`, `speed` are present and valid
- Given `sector_intensity`, when an outer planet occupies a sector, then its weight contribution is ≥ 1.5
- Given the transit cache, when outer planets are added, then cache key includes version to invalidate stale entries
