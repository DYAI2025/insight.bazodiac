# Stakeholders

Everyone with a stake in the system: those who use it, fund it, maintain it, or are affected by it. Every requirement should trace back to a stakeholder need.

## Influence Levels

- **High** — can approve or veto decisions; priority conflicts resolved in their favor
- **Medium** — consulted during review; concerns addressed but may be overruled
- **Low** — informed of decisions; needs considered but not blocking

## Stakeholder Table

| ID | Role | Description | Interests | Influence |
|----|------|-------------|-----------|-----------|
| STK-founder | Founder / Product Owner | FuFirE creator and business owner | Revenue, brand credibility, astrological correctness, launch timeline | High |
| STK-api-consumer | B2B API Consumer | Developers integrating FuFirE into their apps (horoscope apps, wellness platforms) | Reliable data, accurate calculations, clear documentation, consistent response schemas | High |
| STK-astrologer | Professional Astrologer | Subject matter expert validating astrological correctness | Traditional accuracy (BaZi + Western), proper orb tables, dignities, correct solar terms | Medium |
| STK-end-user | End User | Person receiving horoscope/chart via consumer app | Personalized, meaningful daily content; trustworthy readings | Low |
| STK-ops-engineer | Operations Engineer | Maintains deployment, monitors uptime, handles incidents | Observability, rate-limit accuracy, caching correctness, error traceability | Medium |
