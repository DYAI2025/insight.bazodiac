# CON-redis-dependency: Redis as Runtime Dependency for Rate Limiting

**Category**: Technical

**Status**: Active

**Source stakeholder**: [STK-ops-engineer](../stakeholders.md)

## Description

Implementing persistent per-key rate-limit counters requires a Redis instance as a shared state store accessible by all Uvicorn workers. This adds a runtime dependency to the deployment.

## Rationale

In-memory rate limiting (current approach) does not work across multiple workers and loses state on restart. For a billing-grade rate limiter, a shared external store is necessary. Redis is the standard choice for SlowAPI and is lightweight to operate.

## Impact

- Fly.io deployment requires an Upstash Redis or Fly Redis add-on
- `requirements.txt` adds `redis` package
- Health check (`/health`) should include Redis connectivity
- Local development requires `docker-compose` with Redis or an in-memory fallback
- Graceful degradation: if Redis is unavailable, fall back to in-memory limiting with a `degraded` health status
