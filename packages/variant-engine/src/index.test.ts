import { describe, it, expect } from 'vitest';
import { generateFromPrompt } from './index';

const PROMPT =
  'Create a Lightning Web Component mockup for an Account Intelligence Console showing health, opportunities, cases, risks, next best actions, contacts, and an executive summary for a VP of Sales.';

describe('variant engine', () => {
  const result = generateFromPrompt(PROMPT);

  it('returns at least 5 variants', () => {
    expect(result.variants.length).toBeGreaterThanOrEqual(5);
  });

  it('each variant contains required LWC files', () => {
    for (const v of result.variants) {
      const paths = v.files.map((f) => f.path);
      expect(paths.some((p) => p.endsWith('.html'))).toBe(true);
      expect(paths.some((p) => p.endsWith('.js'))).toBe(true);
      expect(paths.some((p) => p.endsWith('.js-meta.xml'))).toBe(true);
      expect(paths.some((p) => p.endsWith('.css'))).toBe(true);
      expect(paths.some((p) => p.endsWith('README.md'))).toBe(true);
      expect(paths.some((p) => p.endsWith('mockData.json'))).toBe(true);
    }
  });

  it('html template uses <template> root and for:each', () => {
    for (const v of result.variants) {
      const html = v.files.find((f) => f.language === 'html')!.content;
      expect(html.trim().startsWith('<template')).toBe(true);
      expect(html).toMatch(/for:each=/);
    }
  });

  it('js imports LightningElement', () => {
    for (const v of result.variants) {
      const js = v.files.find((f) => f.language === 'js')!.content;
      expect(js).toMatch(/import\s*\{\s*LightningElement\s*\}\s*from\s*'lwc'/);
    }
  });

  it('xml exposes Lightning page targets', () => {
    for (const v of result.variants) {
      const xml = v.files.find((f) => f.language === 'xml')!.content;
      expect(xml).toMatch(/lightning__RecordPage/);
      expect(xml).toMatch(/<isExposed>true<\/isExposed>/);
    }
  });

  it('mock data is non-empty and Salesforce-shaped', () => {
    for (const v of result.variants) {
      const mock = v.mockData as any;
      expect(mock.account?.name).toBeTruthy();
      expect(Array.isArray(mock.opportunities)).toBe(true);
      expect(mock.opportunities.length).toBeGreaterThan(0);
      expect(mock.cases.length).toBeGreaterThan(0);
    }
  });

  it('produces preview HTML', () => {
    for (const v of result.variants) {
      expect(v.previewHtml.length).toBeGreaterThan(200);
      expect(v.previewHtml).toMatch(/slds-/);
    }
  });
});
