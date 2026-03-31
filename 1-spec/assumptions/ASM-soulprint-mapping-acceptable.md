# ASM-soulprint-mapping-acceptable: Wu-Xing→Sector Mapping is Acceptable if Documented

**Category**: Business

**Status**: Unverified

**Risk if wrong**: High — professional astrologers may reject the engine as non-traditional, damaging credibility for the B2B service

## Statement

The current Wu-Xing→zodiac-sector mapping in `soulprint.py` (e.g., Holz → Cancer/Leo) is not based on traditional Chinese or Western astrological correspondence but is a proprietary FuFirE model. We assume that documenting this clearly as "FuFirE proprietary fusion model" and exposing the mapping in provenance is sufficient to maintain credibility with B2B consumers.

## Rationale

There is no universally accepted mapping between Chinese Five Elements and Western zodiac sectors. Any mapping is necessarily a creative synthesis. Transparency about the model's nature is more important than traditional correctness.

## Verification Plan

Have 2–3 professional astrologers review the mapping documentation and provide feedback on whether the transparency approach is sufficient for their use case.

## Related Artifacts

- [US-transparent-fusion](../user-stories/US-transparent-fusion.md)
- [REQ-F-provenance-soulprint-weights](../requirements/REQ-F-provenance-soulprint-weights.md)
