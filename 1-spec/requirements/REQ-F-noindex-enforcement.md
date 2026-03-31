# REQ-F-noindex-enforcement: Page Must Have noindex Meta Tag

**Type**: Functional

**Status**: Draft

**Priority**: Must-have

**Source**: [CON-confidential-not-indexed](../constraints/CON-confidential-not-indexed.md)

**Source stakeholder**: [STK-founder](../stakeholders.md)

## Description

The `index.html` file must contain `<meta name="robots" content="noindex, nofollow">` in the `<head>` section to prevent search engine crawling. This enforces the "Confidential Preview" positioning.

## Acceptance Criteria

- Given the page is deployed to bazodiac.space, when a search engine crawler visits, then it finds a `noindex, nofollow` robots meta tag in the HTML `<head>`
- Given a developer inspects `index.html`, when they search for the robots meta tag, then it exists on a line before `</head>`
