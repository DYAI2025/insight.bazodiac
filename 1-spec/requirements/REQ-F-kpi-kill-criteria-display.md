# REQ-F-kpi-kill-criteria-display: Display KPIs With Target/Warning/Kill Thresholds

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [US-investor-sees-risk-framework](../user-stories/US-investor-sees-risk-framework.md)

**Source stakeholder**: [STK-investor](../stakeholders.md)

## Description

The page must display at least 3 measurable KPIs per critical risk with target, warning, and kill thresholds in a table or card format. Must include the 90-day validation cycle timeline (Day 0/14/30/60/90 review cadence). Must state the core principle: "Kill criteria are committed before launch and cannot be changed during the cycle."

## Acceptance Criteria

- Given the KPI display for Risk 1, when an investor reads it, then at least 3 KPIs are shown with three threshold levels (e.g., "D30 Retention: target ≥18%, warning <12%, kill <7%")
- Given the KPI display for Risk 2, when an investor reads it, then at least 3 KPIs are shown (e.g., "Free→Essentials: target ≥5%, warning <3%, kill <1.5%")
- Given the validation timeline, when displayed, then the Day 0/14/30/60/90 cadence is visible with action labels per checkpoint
- Given the kill discipline statement, when reading the section, then the text includes: "Kill criteria committed before launch — cannot be changed during the cycle" or equivalent

## Related Constraints

- [CON-90-day-kill-discipline](../constraints/CON-90-day-kill-discipline.md)
