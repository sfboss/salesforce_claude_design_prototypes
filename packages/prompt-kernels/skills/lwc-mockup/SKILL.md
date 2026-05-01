# SKILL: lwc-mockup

## Purpose
Generate a believable Lightning Web Component mockup from a plain-English Salesforce UI description.

## Inputs
- A natural-language prompt describing the desired Salesforce UI.
- Optional: target surface, persona, density, theme, primary object hint.

## Output Contract
A `GenerationResult` object containing:
- `intent: SalesforceIntent`
- `variants: LwcVariant[]` (5 minimum)
- `selectedVariantId: string`
- `warnings: string[]`
- `nextActions: string[]`

Each variant must include `.html`, `.js`, `.js-meta.xml`, `.css`, `README.md`, and `mockData.json`.

## Salesforce Assumptions
- Standard objects unless prompt names custom ones.
- API version `63.0` unless a project-level override is configured.
- Targets: `lightning__AppPage`, `lightning__RecordPage`, `lightning__HomePage`.
- Mock data must be Salesforce-shaped (CaseNumber, StageName, Probability, etc.).

## SLDS Constraints
- Use SLDS utility classes (`slds-card`, `slds-grid`, `slds-button_brand`, etc.).
- No Tailwind/Bootstrap/React dependencies.
- No external CDN imports inside deployable LWC source.
- Keep CSS scoped to layout refinements and premium accents.

## Variant Rules
- Exactly five canonical variants: standard, dense, executive, mobile, premium.
- Each variant must reuse the same mock dataset to keep comparisons honest.
- Premium variant may use gradients/glass but must remain plausibly Salesforce-shipped.

## Bad Output Examples
- `<div>Lorem ipsum</div>` placeholder content.
- React/JSX syntax like `className`.
- Hard-coded record IDs (`001xx0000003ABC`) implying a real org.
- Tailwind classes (`bg-blue-500 p-4`).

## Good Output Examples
- `<template>` root with `for:each` over class fields named like `opportunities`, `cases`.
- SLDS classes throughout: `slds-card`, `slds-page-header__detail-block`, `slds-badge`.
- README documenting the wiring path from mock to UI API/Apex.

## Test Prompt
```
Create a Lightning Web Component mockup for an Account Intelligence Console.
It should show account health, open opportunities, recent cases, risk signals,
next best actions, related contacts, and an executive summary card. Make it feel
like something a Salesforce architect would show to a VP of Sales.
```
