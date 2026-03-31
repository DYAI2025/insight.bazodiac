# US-accurate-rate-limits: Accurate Per-Key Rate Limit Tracking

**As a** B2B API consumer, **I want** `X-RateLimit-Remaining` to reflect my actual remaining quota, **so that** I can monitor my usage and avoid unexpected 429 errors.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

**Related goal**: [GOAL-paid-api-readiness](../goals/GOAL-paid-api-readiness.md)

## Acceptance Criteria

- Given an API key with tier `pro` (100 req/min), when 10 requests have been made in the current minute, then `X-RateLimit-Remaining` returns `90`
- Given an API key, when the rate window resets, then `X-RateLimit-Remaining` returns the full tier limit
- Given a `free` tier key, when 100 daily requests have been made, then HTTP 429 is returned with accurate `Retry-After`
- Given the rate-limit store, when the server restarts, then counters survive (persistent storage, not in-memory)

## Derived Requirements

- [REQ-F-persistent-rate-limits](../requirements/REQ-F-persistent-rate-limits.md)
