# US-precise-daily-jieqi: Astronomically Precise Jieqi in Daily Eastern

**As a** professional astrologer, **I want** the daily eastern horoscope to determine the active solar term via Swiss Ephemeris, **so that** the Jieqi name is correct on transition days rather than approximated from the calendar month.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-astrologer](../stakeholders.md)

**Related goal**: [GOAL-paid-api-readiness](../goals/GOAL-paid-api-readiness.md)

## Acceptance Criteria

- Given a target date of 2026-02-03 (day before LiChun), when the eastern daily is generated, then the solar term is "Xiaohan" or "Dahan" (not "Lichun")
- Given a target date of 2026-02-04 (LiChun day), when the eastern daily is generated, then the solar term is "Lichun"
- Given the daily generator, when inspecting the code, then `compute_24_solar_terms_for_window()` or equivalent Swiss Ephemeris call is used instead of `(dt.month - 1) % 12`

## Derived Requirements

- [REQ-F-precise-jieqi-daily](../requirements/REQ-F-precise-jieqi-daily.md)
