# US-accurate-aspects: Differentiated Aspect Orbs per Planet Pair

**As a** B2B API consumer, **I want** aspect calculations to use planet-specific orb tables, **so that** my users don't see false-positive aspects between minor bodies or miss tight aspects between luminaries.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

**Related goal**: [GOAL-paid-api-readiness](../goals/GOAL-paid-api-readiness.md)

## Acceptance Criteria

- Given Sun and Moon at 9.5° angular distance, when aspects are computed, then a conjunction is reported (Sun/Moon orb ≥ 10°)
- Given Chiron and Pluto at 6° angular distance from a conjunction, when aspects are computed, then no conjunction is reported (Chiron orb ≤ 3°)
- Given the provenance block, when inspecting `parameter_set.aspect_orbs`, then per-planet base orbs are listed
- Given a request to `/calculate/western`, when the response includes aspects, then each aspect's effective orb reflects the mean of both planets' base orbs

## Derived Requirements

- [REQ-F-differentiated-orbs](../requirements/REQ-F-differentiated-orbs.md)
