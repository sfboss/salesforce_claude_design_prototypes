import { parseSalesforceIntent, type SalesforceIntent } from '@lwc-design-studio/salesforce-intent';
import { accountIntelligenceMock, type AccountIntelligenceMock } from '@lwc-design-studio/slds-patterns';
import { VARIANT_SPECS, buildLwcArtifact, previewFor, type VariantSpec } from './variants';
import type { GenerationResult, LwcVariant, LwcFile } from './types';

export * from './types';
export { VARIANT_SPECS } from './variants';

function variantFromSpec(spec: VariantSpec, mock: AccountIntelligenceMock, intent: SalesforceIntent): LwcVariant {
  const art = buildLwcArtifact(spec, mock);
  const base = `force-app/main/default/lwc/${spec.componentName}`;
  const files: LwcFile[] = [
    { path: `${base}/${spec.componentName}.html`, language: 'html', content: art.html },
    { path: `${base}/${spec.componentName}.js`, language: 'js', content: art.js },
    { path: `${base}/${spec.componentName}.js-meta.xml`, language: 'xml', content: art.xml },
    { path: `${base}/${spec.componentName}.css`, language: 'css', content: art.css },
    { path: `${base}/README.md`, language: 'md', content: art.readme },
    { path: `${base}/mockData.json`, language: 'json', content: art.mockJson },
  ];
  const diagnostics: string[] = [
    `Detected domain: ${intent.domain}, surface: ${intent.targetSurface}, persona: ${intent.userPersona}.`,
    `Primary object inferred: ${intent.primaryObject ?? 'Account (default)'}; related: ${intent.relatedObjects.join(', ') || 'none'}.`,
    `Variant tone: ${spec.visualTone}; default device: ${spec.defaultDevice}.`,
  ];
  const deployNotes: string[] = [
    'Replace inline mock arrays with @wire(getRecord) and Apex/UIAPI calls.',
    'Verify custom fields (Health_Score__c, Risk_Level__c, Renewal_Date__c, Last_Touch__c, Influence__c) exist or substitute formulas.',
    'Add loading/error templates for each wired data source.',
    'Confirm Lightning App Builder targets are appropriate for the placement.',
  ];
  return {
    id: spec.id,
    label: spec.label,
    description: spec.description,
    designRationale: spec.designRationale,
    componentName: spec.componentName,
    files,
    mockData: mock as unknown as Record<string, unknown>,
    diagnostics,
    deployNotes,
    previewHtml: previewFor(spec, mock),
    previewCss: art.css,
    visualTone: spec.visualTone,
    defaultDevice: spec.defaultDevice,
  };
}

export function generateFromPrompt(prompt: string): GenerationResult {
  const intent = parseSalesforceIntent(prompt);
  const mock = accountIntelligenceMock; // first vertical slice ships with the canonical mock
  const variants = VARIANT_SPECS.map((s) => variantFromSpec(s, mock, intent));
  const warnings: string[] = [];
  if (!intent.primaryObject) {
    warnings.push('No primary Salesforce object detected from prompt; defaulting to Account.');
  }
  if (intent.dataNeeds.length === 0) {
    warnings.push('No explicit data needs detected; using the default Account Intelligence dataset.');
  }
  return {
    prompt,
    intent,
    variants,
    selectedVariantId: variants[0].id,
    warnings,
    nextActions: [
      'Open the executive variant for stakeholder reviews.',
      'Export the standard record page variant into your DX project under force-app/main/default/lwc.',
      'Replace mock arrays with real Apex or UI API wires before deployment.',
    ],
  };
}
