# SKILL: flow-screen

## Purpose
Generate an LWC suitable for use as a Flow screen component.

## Inputs
- Steps in the guided flow.
- Required outputs (e.g., approval decision, selected record).
- Persona and density.

## Output Contract
An LWC variant exposing `lightning__FlowScreen` target and `@api` properties for inputs/outputs.

## Salesforce Assumptions
- Flow Builder will pass merge variables in.
- Component participates in screen flow validation hooks (`@api validate()`).
- Avoid heavy external assets — flows often run in Experience Cloud and mobile.

## SLDS Constraints
- Use `slds-form` patterns and `slds-progress` for multi-step indicator.
- Stick to single-column layouts unless explicitly asked otherwise.

## Variant Rules
- Comfortable single-step variant.
- Multi-step wizard variant with progress bar.

## Bad Output Examples
- Custom router logic inside the LWC.
- Hardcoded flow API names in markup.

## Good Output Examples
- `@api recordId`, `@api selectedDecision` properties.
- `validate()` returning `{ isValid, errorMessage }`.

## Test Prompt
```
Create a flow screen LWC that walks an approver through a 3-step approval wizard
with a final summary and approve/reject decision.
```
