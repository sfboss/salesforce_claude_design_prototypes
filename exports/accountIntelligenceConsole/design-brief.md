# Design Brief

**Prompt:** Create a Lightning Web Component mockup for an Account Intelligence Console. It should show account health, open opportunities, recent cases, risk signals, next best actions, related contacts, and an executive summary card. Make it feel like something a Salesforce architect would show to a VP of Sales.

## Detected Salesforce Intent
```json
{
  "domain": "sales",
  "targetSurface": "dashboard",
  "primaryObject": "Account",
  "relatedObjects": [
    "Opportunity",
    "Contact",
    "Case"
  ],
  "userPersona": "executive",
  "dataNeeds": [
    "health",
    "risk",
    "summary"
  ],
  "interactionNeeds": [
    "create",
    "next best action"
  ],
  "visualTone": "executive"
}
```

## Variants
### Standard Record Page (`accountIntelligenceConsoleStandard`)
Conservative Lightning record page layout for an Account Intelligence Console.

**Rationale:** Two-column record summary with highlights panel, related lists, and recent activity. Mirrors stock Lightning record page conventions admins and end users will recognize immediately.

**Diagnostics:**
- Detected domain: sales, surface: dashboard, persona: executive.
- Primary object inferred: Account; related: Opportunity, Contact, Case.
- Variant tone: standard; default device: desktop.

**Deploy Notes:**
- Replace inline mock arrays with @wire(getRecord) and Apex/UIAPI calls.
- Verify custom fields (Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c, Influence__c) exist or substitute formulas.
- Add loading/error templates for each wired data source.
- Confirm Lightning App Builder targets are appropriate for the placement.

### Console Dense (`accountIntelligenceConsoleDense`)
Compact three-rail console workspace optimized for power users.

**Rationale:** Left context rail, center datatable workspace, right insight/action rail. Tight typography and many visible records — built for sales ops or service leads working multiple accounts at once.

**Diagnostics:**
- Detected domain: sales, surface: dashboard, persona: executive.
- Primary object inferred: Account; related: Opportunity, Contact, Case.
- Variant tone: dense; default device: desktop.

**Deploy Notes:**
- Replace inline mock arrays with @wire(getRecord) and Apex/UIAPI calls.
- Verify custom fields (Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c, Influence__c) exist or substitute formulas.
- Add loading/error templates for each wired data source.
- Confirm Lightning App Builder targets are appropriate for the placement.

### Executive Dashboard (`accountIntelligenceConsoleExecutive`)
Stakeholder-ready dashboard layout with KPIs and narrative summary.

**Rationale:** KPI grid on top, executive narrative card, pipeline and risk summaries side-by-side, and recommended actions. Designed for VP-level read-only review.

**Diagnostics:**
- Detected domain: sales, surface: dashboard, persona: executive.
- Primary object inferred: Account; related: Opportunity, Contact, Case.
- Variant tone: executive; default device: desktop.

**Deploy Notes:**
- Replace inline mock arrays with @wire(getRecord) and Apex/UIAPI calls.
- Verify custom fields (Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c, Influence__c) exist or substitute formulas.
- Add loading/error templates for each wired data source.
- Confirm Lightning App Builder targets are appropriate for the placement.

### Mobile Card Stack (`accountIntelligenceConsoleMobile`)
Responsive mobile-first stack for field reps.

**Rationale:** Stacked cards with large touch targets, condensed related lists, and a sticky CTA bar. Tuned for Salesforce mobile / field execution.

**Diagnostics:**
- Detected domain: sales, surface: dashboard, persona: executive.
- Primary object inferred: Account; related: Opportunity, Contact, Case.
- Variant tone: mobile; default device: mobile.

**Deploy Notes:**
- Replace inline mock arrays with @wire(getRecord) and Apex/UIAPI calls.
- Verify custom fields (Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c, Influence__c) exist or substitute formulas.
- Add loading/error templates for each wired data source.
- Confirm Lightning App Builder targets are appropriate for the placement.

### Vibe-Coded Premium (`accountIntelligenceConsolePremium`)
Elevated visual treatment with premium accents while staying SLDS-plausible.

**Rationale:** Subtle gradient accents, soft glassy cards, and stronger hierarchy. Still SLDS-compatible so it could plausibly ship as a premium AppExchange surface.

**Diagnostics:**
- Detected domain: sales, surface: dashboard, persona: executive.
- Primary object inferred: Account; related: Opportunity, Contact, Case.
- Variant tone: experimental; default device: desktop.

**Deploy Notes:**
- Replace inline mock arrays with @wire(getRecord) and Apex/UIAPI calls.
- Verify custom fields (Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c, Influence__c) exist or substitute formulas.
- Add loading/error templates for each wired data source.
- Confirm Lightning App Builder targets are appropriate for the placement.
