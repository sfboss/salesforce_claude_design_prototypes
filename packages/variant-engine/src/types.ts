export type LwcLanguage = 'html' | 'js' | 'xml' | 'css' | 'json' | 'md';

export interface LwcFile {
  path: string;
  language: LwcLanguage;
  content: string;
}

export interface LwcVariant {
  id: string;
  label: string;
  description: string;
  designRationale: string;
  componentName: string;
  files: LwcFile[];
  mockData: Record<string, unknown>;
  diagnostics: string[];
  deployNotes: string[];
  /** Static SLDS HTML for the in-browser preview. */
  previewHtml: string;
  /** Optional CSS string scoped to the preview (kept simple). */
  previewCss?: string;
  /** Tone tag used by the studio to style chrome. */
  visualTone: 'standard' | 'dense' | 'executive' | 'mobile' | 'experimental';
  /** Recommended viewport for the preview default. */
  defaultDevice: 'desktop' | 'tablet' | 'mobile';
}

export interface GenerationResult {
  prompt: string;
  intent: import('@lwc-design-studio/salesforce-intent').SalesforceIntent;
  variants: LwcVariant[];
  selectedVariantId: string;
  warnings: string[];
  nextActions: string[];
}
