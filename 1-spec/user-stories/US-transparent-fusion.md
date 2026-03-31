# US-transparent-fusion: Full Parameter Transparency in Provenance

**As a** B2B API consumer, **I want** all fusion weights and mapping decisions to be documented in the provenance block, **so that** I can explain to my users why a reading looks the way it does.

**Status**: Draft

**Priority**: Should-have

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

**Related goal**: [GOAL-paid-api-readiness](../goals/GOAL-paid-api-readiness.md)

## Acceptance Criteria

- Given a call to `/calculate/fusion`, when inspecting `provenance.parameter_set`, then soulprint weights (sun=1.0, moon=0.8, asc=0.6, personal=0.4) are listed
- Given a call to `/experience/bootstrap`, when inspecting the response, then the soulprint computation method is referenced
- Given the Wu-Xing sector mapping used in soulprint, when inspecting provenance, then the mapping table is either included or referenced by ID

## Derived Requirements

- [REQ-F-provenance-soulprint-weights](../requirements/REQ-F-provenance-soulprint-weights.md)
