# SKILL: executive-dashboard

## Purpose
Generate stakeholder-ready dashboard mockups for VP/CXO audiences.

## Inputs
- KPIs to highlight.
- Narrative themes (growth, risk, retention).
- Time horizon.

## Output Contract
LWC variant with KPI grid, narrative summary card, and recommended actions.

## Salesforce Assumptions
- Component lives on a Home or App Page targeted at executives.
- Heavy aggregation; should describe Apex/CRM Analytics dependencies in deploy notes.

## SLDS Constraints
- Use `slds-card slds-p-around_medium` for KPI tiles.
- Use `slds-text-heading_large` sparingly for headline metrics.
- Avoid console chrome.

## Variant Rules
- Standard executive layout.
- Premium variant with restrained gradient accents (still SLDS-believable).

## Bad Output Examples
- Sci-fi unreadable visuals.
- Dense data tables in a VP-facing tile.

## Good Output Examples
- 4-up KPI row with deltas.
- Narrative paragraph summarizing the account/portfolio in plain English.

## Test Prompt
```
Build an executive dashboard LWC summarizing a strategic account's pipeline,
risk, and recommended actions for a VP of Sales.
```
