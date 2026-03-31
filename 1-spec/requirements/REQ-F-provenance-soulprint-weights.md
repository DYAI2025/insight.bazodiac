# REQ-F-provenance-soulprint-weights: Soulprint Weights in Provenance

**Type**: Functional

**Status**: Draft

**Priority**: Should-have

**Source**: [US-transparent-fusion](../user-stories/US-transparent-fusion.md)

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

## Description

Add soulprint computation weights and the Wu-Xing→sector mapping to `WUXING_PARAMETER_SET` in `provenance.py` so they are included in every provenance block. This allows API consumers to understand and reproduce the soulprint calculation.

Parameters to include:
- `soulprint_sun_weight`: 1.0
- `soulprint_moon_weight`: 0.8
- `soulprint_asc_weight`: 0.6
- `soulprint_personal_planet_weight`: 0.4
- `soulprint_wuxing_sector_weight`: 0.5
- `wuxing_sector_mapping`: the `_WUXING_SECTORS` dict from `soulprint.py`

## Acceptance Criteria

- Given any `/calculate/fusion` response, when reading `provenance.parameter_set`, then soulprint weights are present
- Given any `/experience/bootstrap` response, when reading `meta`, then the parameter set version is referenced
- Given the parameter set, when the mapping is updated in code, then the version string changes
