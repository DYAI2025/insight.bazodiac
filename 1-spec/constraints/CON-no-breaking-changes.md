# CON-no-breaking-changes: No Breaking Changes to Existing API Contracts

**Category**: Technical

**Status**: Active

**Source stakeholder**: [STK-founder](../stakeholders.md)

## Description

Existing endpoint paths, response schemas, and field names must not change. All improvements must be additive (new fields, new planets in existing dicts) or internal (improved accuracy with same output shape). The AGENTS.md constraint "Endpoints are frozen" must be respected.

## Rationale

The Bazodiac app and ElevenLabs webhook integration depend on current response shapes. Breaking changes would require coordinated client updates.

## Impact

- Adding outer planets to `/transit/now` is additive (new keys in `planets` dict) — allowed
- Removing `delta` from `/transit/state` is breaking — must be handled via schema versioning or by making the field optional
- Changing aspect orb values changes output data (different aspects reported) — acceptable as a precision improvement, but must be documented in changelog
- New provenance fields are additive — allowed
