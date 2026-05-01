# accountIntelligenceConsoleDense

Compact three-rail console workspace optimized for power users.

## What this mockup demonstrates
Left context rail, center datatable workspace, right insight/action rail. Tight typography and many visible records — built for sales ops or service leads working multiple accounts at once.

## Where to place it
- Lightning App Builder targets: AppPage, RecordPage, HomePage.
- Suggested surface: Desktop record/app page.

## Mock data → real data wiring
This component currently uses inline mock data on the class. To wire to a real org:
- Replace `account` with a wire to `getRecord` or an Apex method returning the Account.
- Replace `opportunities`, `contacts`, `cases` with wires to UI API related lists or Apex.
- Compute KPIs server-side (`healthScore`, pipeline totals) for performance.
- Risk signals and next best actions can come from Einstein or a custom service Apex class.

## Assumed objects and fields
- Account: Name, Industry, Type, AnnualRevenue, OwnerId, BillingCity, custom Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c.
- Opportunity: Name, StageName, Amount, CloseDate, Probability, OwnerId.
- Contact: Name, Title, Email, Phone, custom Influence__c.
- Case: CaseNumber, Subject, Priority, Status, plus age computed on render.

## Before production
- Replace mock arrays with wires.
- Add error/loading states for each wired data source.
- Add field-level security checks; use `lightning/uiRecordApi` where possible.
- Replace gradients/glass styling with org-approved tokens for the premium variant.

Sample data summary: Acme Industrial Systems — 4 open opps, 3 cases.
