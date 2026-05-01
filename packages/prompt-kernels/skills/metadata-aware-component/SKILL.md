# SKILL: metadata-aware-component

## Purpose
Generate LWC that consume an org-describe JSON / metadata payload to drive their own field rendering.

## Inputs
- Object describe JSON (object name, fields, relationships).
- Optional layout hint.

## Output Contract
An LWC variant with @api properties for `objectApiName` and `fieldsJson`, and rendering logic that loops over the supplied fields.

## Salesforce Assumptions
- Component will eventually call `@wire(getObjectInfo)` and `getRecord` in production.
- Mockup keeps describe JSON inline.

## SLDS Constraints
- Use `slds-form` and `slds-form-element` patterns for field rendering.
- Group fields by section using `slds-section`.

## Variant Rules
- Read-only display variant.
- Inline-edit variant.

## Bad Output Examples
- Hardcoded field names that ignore the supplied describe JSON.
- Skipping field-level security disclosure.

## Good Output Examples
- Loop over fields with `for:each`, render label/value pairs.
- README documents the `@wire(getObjectInfo)` migration path.

## Test Prompt
```
Generate a metadata-aware Account record viewer LWC that takes a describe JSON
and renders a sectioned form.
```
