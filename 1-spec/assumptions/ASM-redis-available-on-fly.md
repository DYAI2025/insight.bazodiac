# ASM-redis-available-on-fly: Redis Available on Fly.io Deployment

**Category**: Technology

**Status**: Unverified

**Risk if wrong**: Medium — would need to use Upstash or alternative persistent store; delays rate-limit feature

## Statement

A Redis instance can be provisioned alongside the FuFirE app on Fly.io (either via `fly redis create` or Upstash Redis integration) with sub-5ms latency from the `ams` region.

## Rationale

Fly.io offers both managed Upstash Redis and community Redis images. The `ams` region where FuFirE is deployed should have Redis availability.

## Verification Plan

Run `fly redis create` in the FuFirE Fly.io org and measure round-trip latency from the app container.

## Related Artifacts

- [REQ-F-persistent-rate-limits](../requirements/REQ-F-persistent-rate-limits.md)
- [CON-redis-dependency](../constraints/CON-redis-dependency.md)
