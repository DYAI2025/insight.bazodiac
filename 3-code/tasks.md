# Tasks — Paid API Readiness

## Current State

- **Active phase**: Phase 1 + Phase 2 — **ALL COMPLETE** ✅
- **Last updated**: 2026-03-28
- **Readiness**: 13/13 tasks done, API reference generated, all tests green (1631 passed)
- **Next**: Phase 3 (Post-Launch) or deploy

---

## Phase 1 — P0: Correctness & Consistency (Pre-Launch Blockers)

These tasks fix calculation inaccuracies, consistency gaps, and billing infrastructure that must be resolved before accepting payments.

| ID | Task | Requirement | Status | Assignee |
|----|------|-------------|--------|----------|
| TASK-01 | Add Uranus/Neptune/Pluto to `TRANSIT_PLANETS` and `PLANET_WEIGHTS` in `transit.py` | [REQ-F-outer-planet-transits](../1-spec/requirements/REQ-F-outer-planet-transits.md) | ✅ Done | — |
| TASK-02 | Add golden vector tests for transit outer planets (verify longitude/speed/sector against known ephemeris values) | [REQ-F-outer-planet-transits](../1-spec/requirements/REQ-F-outer-planet-transits.md) | ✅ Done | — |
| TASK-03 | Replace flat orb table in `aspects.py` with per-planet base orb system + aspect factor | [REQ-F-differentiated-orbs](../1-spec/requirements/REQ-F-differentiated-orbs.md) | ✅ Done | — |
| TASK-04 | Update `WUXING_PARAMETER_SET` in `provenance.py` to include new orb table + soulprint weights + transit weights | [REQ-F-differentiated-orbs](../1-spec/requirements/REQ-F-differentiated-orbs.md) | ✅ Done | — |
| TASK-05 | Add aspect orb tests: Sun-Moon wide orb positive, Chiron-Pluto narrow orb negative, effective_orb formula | [REQ-F-differentiated-orbs](../1-spec/requirements/REQ-F-differentiated-orbs.md) | ✅ Done | — |
| TASK-06 | Replace `(dt.month - 1) % 12` Jieqi approximation in `daily_eastern.py` with Swiss Ephemeris solar longitude lookup | [REQ-F-precise-jieqi-daily](../1-spec/requirements/REQ-F-precise-jieqi-daily.md) | ✅ Done | — |
| TASK-07 | Add Jieqi boundary tests for daily eastern (18 tests: names, fallback, ephemeris boundaries, graceful degradation) | [REQ-F-precise-jieqi-daily](../1-spec/requirements/REQ-F-precise-jieqi-daily.md) | ✅ Done | — |
| TASK-08 | Decided: Option A (Remove delta fields + dominance_shift event type from schema) | [REQ-F-remove-null-deltas](../1-spec/requirements/REQ-F-remove-null-deltas.md) | ✅ Done | — |
| TASK-09 | Removed `delta` from TRANSIT_STATE, bumped to v2, removed `dominance_shift` event type | [REQ-F-remove-null-deltas](../1-spec/requirements/REQ-F-remove-null-deltas.md) | ✅ Done | — |

---

## Phase 2 — P1: Billing Infrastructure & Transparency

| ID | Task | Requirement | Status | Assignee |
|----|------|-------------|--------|----------|
| TASK-10 | Redis storage backend: `REDIS_URL` env → `storage_uri`, `in_memory_fallback_enabled`, `key_prefix=fufire_rl:` | [REQ-F-persistent-rate-limits](../1-spec/requirements/REQ-F-persistent-rate-limits.md) | ✅ Done | — |
| TASK-11 | `/health` reports `rate_limiter` dependency (ok/degraded/unavailable), `/ready` degrades on unavailable | [REQ-F-persistent-rate-limits](../1-spec/requirements/REQ-F-persistent-rate-limits.md) | ✅ Done | — |
| TASK-12 | Add soulprint weights + Wu-Xing sector mapping to `WUXING_PARAMETER_SET` | [REQ-F-provenance-soulprint-weights](../1-spec/requirements/REQ-F-provenance-soulprint-weights.md) | ✅ Done | — |
| TASK-13 | Regenerated `spec/openapi/openapi.json` — `--check` confirms up-to-date | All | ✅ Done | — |

---

## Phase 3 — P2: Enhanced Fusion Quality (Post-Launch)

_Not yet decomposed into tasks. Planned improvements:_

- Aspect-weighted Wu-Xing contributions (tight aspects amplify element weight)
- House-based planet weighting (angular houses ×1.3, cadent ×0.8)
- Minor aspects (quincunx 150°, semi-sextile 30°)
- Improved daily horoscope templates (more variants per relation × jieqi × weekday)

---

## Phase 4 — P3: Enterprise Differentiation (Future)

_Not yet decomposed. Candidates:_

- Planetary dignities (domicile, detriment, exaltation, fall)
- Decanates and terms
- Fixed star conjunctions
- Progressions / solar arc directions
- Ke-cycle (相剋) analysis in Wu-Xing fusion
