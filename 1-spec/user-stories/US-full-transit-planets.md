# US-full-transit-planets: Outer Planets in Transit Calculations

**As a** B2B API consumer, **I want** transit endpoints to include Uranus, Neptune, and Pluto, **so that** my app can report the most impactful slow-moving transits that astrologers and users expect.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

**Related goal**: [GOAL-paid-api-readiness](../goals/GOAL-paid-api-readiness.md)

## Acceptance Criteria

- Given a call to `GET /transit/now`, when the response is received, then `planets` contains keys for `uranus`, `neptune`, and `pluto` with valid longitude, sector, sign, and speed
- Given the `PLANET_WEIGHTS` configuration, when outer planets are included, then their weights reflect slower orbital speed (Uranus ≥ 1.5, Neptune ≥ 1.8, Pluto ≥ 2.0)
- Given a call to `POST /transit/state`, when sector intensity is computed, then outer planet contributions are included
- Given a call to `POST /experience/daily`, when the western daily is generated, then outer planet transits can trigger active sectors

## Derived Requirements

- [REQ-F-outer-planet-transits](../requirements/REQ-F-outer-planet-transits.md)
