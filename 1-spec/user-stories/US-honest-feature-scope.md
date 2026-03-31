# US-honest-feature-scope: Remove or Implement Undelivered Features

**As a** B2B API consumer, **I want** every field in the API response to contain real data, **so that** I don't build features on fields that are always null.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

**Related goal**: [GOAL-paid-api-readiness](../goals/GOAL-paid-api-readiness.md)

## Acceptance Criteria

- Given `POST /transit/state`, when inspecting `delta.vs_previous`, then the field either contains real comparison data or is removed from the schema
- Given `POST /transit/state`, when inspecting `delta.vs_30day_avg`, then the field either contains real data or is removed from the schema
- Given the `dominance_shift` event type, when it is documented in the API, then it actually fires under real conditions (not gated behind a non-existent history store)

## Derived Requirements

- [REQ-F-remove-null-deltas](../requirements/REQ-F-remove-null-deltas.md)
