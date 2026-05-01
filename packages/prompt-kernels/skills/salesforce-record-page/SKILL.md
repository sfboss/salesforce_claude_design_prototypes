# SKILL: salesforce-record-page

## Purpose
Generate an LWC mockup that fits the Lightning Record Page convention.

## Inputs
- Primary object name (Account, Opportunity, Case, etc.).
- Related objects (Contacts, Opportunities, Cases).
- Persona (admin, sales leader, executive, end user).

## Output Contract
A single `LwcVariant` (or set of variants) containing a record-page-shaped layout:
- Highlights panel with key fields.
- Two-column body (related lists, activity, next steps).
- Optional path indicator on the primary object.

## Salesforce Assumptions
- Component will be dropped into Lightning App Builder on a record page.
- Page receives a `recordId` API property (production wiring), but mockup uses inline data.
- Custom fields should be surfaced where realistic (e.g., `Health_Score__c`).

## SLDS Constraints
- Use `slds-page-header_record-home` for the highlights region.
- Use `slds-page-header__detail-block` tiles for key fields.
- Related lists use `slds-card` + `slds-table_cell-buffer`.

## Variant Rules
- Conservative: comfortable density, two-column.
- Compact: switches to three-column with a context rail.

## Bad Output Examples
- Drag-and-drop dashboard widgets that wouldn't pass design review.
- Mixed metaphors (Service Cloud console chrome on a Sales record page).

## Good Output Examples
- Highlights panel with 5 key tiles for an Account.
- Related Opportunities list with stage, amount, close date.

## Test Prompt
```
Build a Lightning record page LWC for the Account object showing highlights,
opportunities, contacts, recent activity, and a next-steps card.
```
