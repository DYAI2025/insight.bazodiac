# REQ-F-differentiated-orbs: Planet-Specific Aspect Orb Table

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-accurate-aspects](../user-stories/US-accurate-aspects.md)

**Source stakeholder**: [STK-api-consumer](../stakeholders.md)

## Description

Replace the flat orb table in `aspects.py` with a per-planet base orb system. The effective orb for any planet pair is `(base_orb_A + base_orb_B) / 2`. Base orbs follow standard professional astrology conventions:

| Planet | Base Orb |
|--------|----------|
| Sun | 10° |
| Moon | 10° |
| Mercury | 7° |
| Venus | 7° |
| Mars | 7° |
| Jupiter | 8° |
| Saturn | 8° |
| Uranus | 5° |
| Neptune | 5° |
| Pluto | 5° |
| Chiron | 3° |
| Lilith | 2° |
| NorthNode | 3° |
| TrueNorthNode | 3° |

The aspect-specific factor modifies the effective orb:
- Conjunction, Opposition, Trine: ×1.0
- Square: ×0.875
- Sextile: ×0.75

## Acceptance Criteria

- Given Sun (base 10°) and Moon (base 10°), when checking for conjunction, then effective orb is `(10+10)/2 × 1.0 = 10°`
- Given Chiron (base 3°) and Pluto (base 5°), when checking for conjunction, then effective orb is `(3+5)/2 × 1.0 = 4°`
- Given Lilith (base 2°) and NorthNode (base 3°), when checking for trine, then effective orb is `(2+3)/2 × 1.0 = 2.5°`
- Given `provenance.parameter_set`, when reading the response, then `aspect_orbs` contains the base orb table and aspect factors
