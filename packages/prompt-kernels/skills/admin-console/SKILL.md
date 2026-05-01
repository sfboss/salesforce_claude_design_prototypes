# SKILL: admin-console

## Purpose
Generate admin/setup-style LWC mockups (permission matrices, profile auditing, sharing rule explorers).

## Inputs
- Admin task (permission set assignment, profile diff, sharing review).
- Persona: admin/architect.

## Output Contract
LWC variant with dense table-driven UI and clear bulk actions.

## Salesforce Assumptions
- Surface lives under Setup or a custom App Page used by admins.
- Data sourced from Tooling API/Metadata API; mockup uses inline arrays.

## SLDS Constraints
- Use `slds-table_bordered slds-table_cell-buffer` for matrix tables.
- Use `slds-checkbox` for grant/revoke cells.
- Use `slds-modal` for bulk-edit confirmations.

## Variant Rules
- Comfortable variant for occasional admins.
- Console-dense variant for ops admins managing dozens of profiles.

## Bad Output Examples
- Implying live writes without confirmation.
- Missing audit columns.

## Good Output Examples
- Matrix with profile rows, permission columns, audit metadata.
- Clear "Apply changes" CTA gated behind a modal.

## Test Prompt
```
Build a permission set matrix designer LWC for admins managing access across
five business units.
```
