# REQ-F-remove-null-deltas: Remove or Implement Transit Delta Fields

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-honest-feature-scope](../user-stories/US-honest-feature-scope.md)

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

## Description

The `delta.vs_previous` and `delta.vs_30day_avg` fields in the `POST /transit/state` response are always `null`. The `dominance_shift` event type never fires because it requires `avg_30d_sectors` which is never provided. For a paid API, permanently-null fields and dead event types erode trust.

**Decision required:** Either:
- **Option A (Remove):** Remove `delta` fields and `dominance_shift` event type from the schema. Document them as "planned for v2" in the changelog.
- **Option B (Implement):** Build a lightweight history store (Redis sorted sets, keyed by API key + date) that tracks the last 30 days of sector snapshots per user, enabling real delta computation.

## Acceptance Criteria

### If Option A (Remove):
- Given `POST /transit/state`, when inspecting the response, then no `delta` field exists
- Given the TRANSIT_STATE_v1 schema, when inspecting event types, then `dominance_shift` is not listed
- Given the API changelog, then the removal is documented with rationale

### If Option B (Implement):
- Given a user who has called `/transit/state` daily for 7+ days, when inspecting `delta.vs_previous`, then it contains real sector differences
- Given 30+ days of history, when inspecting `delta.vs_30day_avg`, then it contains meaningful averages
- Given a dominant sector shift, when the margin ≥ 0.08, then a `dominance_shift` event fires
