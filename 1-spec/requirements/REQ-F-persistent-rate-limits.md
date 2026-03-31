# REQ-F-persistent-rate-limits: Persistent Per-Key Rate Limit Counters

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-accurate-rate-limits](../user-stories/US-accurate-rate-limits.md)

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

## Description

Replace the in-memory SlowAPI limiter with a Redis-backed storage backend. Per-key counters must persist across server restarts and be accurate across multiple worker processes. `X-RateLimit-Remaining` must reflect the actual remaining quota for the current window.

## Acceptance Criteria

- Given an API key, when 10 requests are made in a 1-minute window, then `X-RateLimit-Remaining` decreases by 1 with each request
- Given a server restart, when the same key makes a request, then the counter reflects pre-restart usage (within the same window)
- Given multiple Uvicorn workers, when the same key makes requests across workers, then the counter is shared and accurate
- Given a key approaching its limit, when `X-RateLimit-Remaining` reaches 0, then the next request returns HTTP 429

## Related Constraints

- [CON-redis-dependency](../constraints/CON-redis-dependency.md) — introduces Redis as a runtime dependency
