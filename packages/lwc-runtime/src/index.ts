// Minimal local "renderer" used by the studio app. We don't compile real LWC at preview time;
// instead we wrap the variant's static SLDS preview HTML in an iframe-ready document.
// This is Phase 7 option 2 from AGENTS.md: Static SLDS HTML preview from the same source model.

import type { LwcVariant } from '@lwc-design-studio/variant-engine';

const SLDS_CDN =
  'https://unpkg.com/@salesforce-ux/design-system@2.24.4/assets/styles/salesforce-lightning-design-system.min.css';

export type Device = 'desktop' | 'tablet' | 'mobile';

export function viewportCss(device: Device): string {
  if (device === 'mobile') return 'max-width: 480px;';
  if (device === 'tablet') return 'max-width: 900px;';
  return '';
}

export function renderPreviewDocument(variant: LwcVariant, device: Device = 'desktop'): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${variant.label}</title>
<link rel="stylesheet" href="${SLDS_CDN}" />
<style>
  html, body { margin: 0; padding: 0; background: #f3f3f3; }
  body { font-family: 'Salesforce Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
  .preview-frame { ${viewportCss(device)} margin: 0 auto; min-height: 100vh; background: #fff; }
  ${variant.previewCss ?? ''}
</style>
</head>
<body class="slds-scope">
  <div class="preview-frame">
    ${variant.previewHtml}
  </div>
</body>
</html>`;
}
