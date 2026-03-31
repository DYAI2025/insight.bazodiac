Phase-specific instructions for the **Specification** phase. Extends [../CLAUDE.md](../CLAUDE.md).

## Purpose

This phase defines **what** we're building and **why**. Focus on clarity, measurability, and alignment with stakeholder needs.

## Phase artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| Stakeholders | [`stakeholders.md`](stakeholders.md) | Roles with interests and influence |
| Goals | [`goals/`](goals/) | High-level outcomes |
| User Stories | [`user-stories/`](user-stories/) | User-facing capabilities |
| Requirements | [`requirements/`](requirements/) | Testable system requirements |
| Assumptions | [`assumptions/`](assumptions/) | Beliefs taken as true but not verified |
| Constraints | [`constraints/`](constraints/) | Hard limits on design and implementation |

---

## AI Guidelines

### Per-artifact guidance

**Stakeholders**: ask who uses, funds, operates, or is affected by the system. Record influence level honestly — it drives conflict resolution. Add entries to [`stakeholders.md`](stakeholders.md).

**Goals**: decompose vague ideas into concrete, measurable outcomes. Use MoSCoW priority consistently.
Status lifecycle: `Draft → Approved → Achieved → Deprecated`. Only a human can approve or deprecate. The agent marks `Achieved` when all success criteria are met (linked requirements implemented).

**User Stories**: use "As a [role], I want [capability], so that [benefit]." The role must be an existing stakeholder ID. Acceptance criteria at the story level are high-level; detailed criteria live in requirements.
Status lifecycle: `Draft → Approved → Implemented → Deprecated`. Only a human can approve or deprecate. The agent marks `Implemented` when all linked requirements reach `Implemented`.

**Requirements**: use clear, testable language (not "should be fast" — use "response time < 200ms at p95"). Choose the correct requirement class.
Requirement classes: `REQ-F` Functional, `REQ-PERF` Performance, `REQ-SEC` Security, `REQ-REL` Reliability, `REQ-USA` Usability, `REQ-MNT` Maintainability, `REQ-PORT` Portability, `REQ-SCA` Scalability, `REQ-COMP` Compliance.
Status lifecycle: `Draft → Approved → Implemented → Deprecated`. Only a human can approve or deprecate. The agent marks `Implemented` when all linked tasks reach Done.

**Assumptions**: always record the risk level (what happens if wrong?) and a verification plan when possible.
Status lifecycle: `Unverified → Verified | Invalidated`. The agent marks `Verified` when the verification plan confirms the assumption. Only a human can mark `Invalidated` (triggers impact analysis on dependent artifacts).

**Constraints**: consider technical (platforms, dependencies), business (budget, timeline, team size), and operational (hosting, compliance) categories.
Status lifecycle: `Active → Lifted`. Only a human can lift a constraint.

### Conflict resolution

A conflict exists when two or more requirements cannot both be satisfied as stated.

**Never resolve a conflict silently.** Always surface it before acting.

1. **Identify**: note conflicting requirement IDs, source stakeholders, influence levels, and why they are incompatible.
2. **Ask the user**: present what makes them incompatible, stakeholders and influence levels, two or more resolution options, and a recommended option if one is clearly better.
3. **Wait for explicit approval** before modifying any file.
4. **Apply**: update affected requirement files and index rows. Update dependent user stories or goals if affected. Record a decision if the resolution imposes a recurring constraint.
5. **Verify**: no artifacts remain in a conflicting state after resolution.

### Assumption invalidation

When an assumption is found to be wrong or no longer holds:

1. **Identify impact**: list all artifacts (requirements, user stories, decisions) that depend on the invalidated assumption.
2. **Ask the user**: present the invalidated assumption, the affected artifacts, and proposed adjustments or alternatives.
3. **Wait for explicit approval** before modifying any file.
4. **Apply**: change the assumption's Status to `Invalidated`. Update or flag all dependent artifacts as directed.
5. **Verify**: no artifacts remain based on the invalidated assumption without acknowledgment.

### Artifact deprecation

When an artifact (goal, user story, requirement) is no longer relevant:

1. Propose deprecation to the user with rationale and downstream impact.
2. Wait for explicit approval.
3. Change Status to `Deprecated` in the artifact file. Update its index row.
4. Check for dependent artifacts — flag any that reference the deprecated item.

---

## Decisions Relevant to This Phase

| File | Title | Trigger |
|------|-------|---------|
<!-- Add rows as decisions are recorded. File column: [DEC-kebab-name](../decisions/DEC-kebab-name.md) -->

---

## Linking to Other Phases

- Goals, user stories, constraints, assumptions, and requirements are referenced in design documents (`2-design/`)
- Requirements determine the development tasks in `3-code/tasks.md`; each task references the requirements it fulfills
- Acceptance criteria inform test cases (`3-code/`)

---

## Goals Index

| File | Priority | Status | Summary |
|------|----------|--------|---------|
| [GOAL-paid-api-readiness](goals/GOAL-paid-api-readiness.md) | Must-have | Draft | Bring FuFirE to production quality for paid B2B API launch |

---

## User Stories Index

| File | Role | Priority | Status | Summary |
|------|------|----------|--------|---------|
| [US-accurate-aspects](user-stories/US-accurate-aspects.md) | STK-api-consumer | Must-have | Draft | Differentiated aspect orbs per planet pair |
| [US-full-transit-planets](user-stories/US-full-transit-planets.md) | STK-api-consumer | Must-have | Draft | Uranus, Neptune, Pluto in transit calculations |
| [US-precise-daily-jieqi](user-stories/US-precise-daily-jieqi.md) | STK-astrologer | Must-have | Draft | Astronomically precise Jieqi in daily eastern |
| [US-accurate-rate-limits](user-stories/US-accurate-rate-limits.md) | STK-api-consumer | Must-have | Draft | Accurate per-key rate limit tracking |
| [US-transparent-fusion](user-stories/US-transparent-fusion.md) | STK-api-consumer | Should-have | Draft | Full parameter transparency in provenance |
| [US-honest-feature-scope](user-stories/US-honest-feature-scope.md) | STK-api-consumer | Must-have | Draft | Remove or implement permanently-null fields |

---

## Requirements Index

| File | Type | Priority | Status | Summary |
|------|------|----------|--------|---------|
| [REQ-F-differentiated-orbs](requirements/REQ-F-differentiated-orbs.md) | Functional | Must-have | Draft | Planet-specific aspect orb table |
| [REQ-F-outer-planet-transits](requirements/REQ-F-outer-planet-transits.md) | Functional | Must-have | Draft | Outer planets in transit calculations |
| [REQ-F-precise-jieqi-daily](requirements/REQ-F-precise-jieqi-daily.md) | Functional | Must-have | Draft | Swiss Ephemeris Jieqi in daily eastern |
| [REQ-F-persistent-rate-limits](requirements/REQ-F-persistent-rate-limits.md) | Functional | Must-have | Draft | Persistent per-key rate limit counters |
| [REQ-F-provenance-soulprint-weights](requirements/REQ-F-provenance-soulprint-weights.md) | Functional | Should-have | Draft | Soulprint weights in provenance |
| [REQ-F-remove-null-deltas](requirements/REQ-F-remove-null-deltas.md) | Functional | Must-have | Draft | Remove or implement transit delta fields |

---

## Assumptions Index

| File | Category | Status | Risk | Summary |
|------|----------|--------|------|---------|
| [ASM-redis-available-on-fly](assumptions/ASM-redis-available-on-fly.md) | Technology | Unverified | Medium | Redis can be provisioned on Fly.io ams region |
| [ASM-soulprint-mapping-acceptable](assumptions/ASM-soulprint-mapping-acceptable.md) | Business | Unverified | High | Proprietary Wu-Xing→sector mapping is acceptable if documented |

---

## Constraints Index

| File | Category | Status | Summary |
|------|----------|--------|---------|
| [CON-redis-dependency](constraints/CON-redis-dependency.md) | Technical | Active | Redis required for persistent rate limiting |
| [CON-no-breaking-changes](constraints/CON-no-breaking-changes.md) | Technical | Active | No breaking changes to existing API contracts |
