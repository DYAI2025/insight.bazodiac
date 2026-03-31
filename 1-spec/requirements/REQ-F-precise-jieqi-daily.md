# REQ-F-precise-jieqi-daily: Swiss Ephemeris Jieqi in Daily Eastern

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-precise-daily-jieqi](../user-stories/US-precise-daily-jieqi.md)

**Source stakeholder**: [STK-astrologer](../stakeholders.md)

## Description

Replace the month-based Jieqi approximation in `services/daily_eastern.py` with an astronomically precise determination using `compute_24_solar_terms_for_window()` or direct solar longitude calculation from Swiss Ephemeris. The active solar term for a given date must be determined by finding which pair of consecutive solar longitude crossings brackets the target date.

## Acceptance Criteria

- Given target date 2026-02-03 (one day before LiChun at ~315° solar longitude), when the eastern daily is generated, then the solar term is the preceding term (DaHan or XiaoHan), not LiChun
- Given target date 2026-08-07 (LiQiu boundary), when the eastern daily is generated, then the solar term correctly reflects whether the target is before or after the LiQiu crossing
- Given any target date, when the Jieqi is determined, then the result matches `bazi.py`'s solar term calculation for the same date
- Given the daily generator function, when tracing the code path, then no `(dt.month - 1) % 12` approximation is used for Jieqi determination
