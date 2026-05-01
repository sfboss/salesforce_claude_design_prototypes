import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { GenerationResult, LwcVariant } from '@lwc-design-studio/variant-engine';

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export async function writeVariantBundle(variant: LwcVariant, exportRoot: string): Promise<string> {
  const variantRoot = path.join(exportRoot, 'variants', variant.componentName);
  for (const file of variant.files) {
    const target = path.join(variantRoot, file.path);
    await ensureDir(path.dirname(target));
    await fs.writeFile(target, file.content, 'utf8');
  }
  return variantRoot;
}

export async function writeDesignBrief(result: GenerationResult, exportRoot: string): Promise<string> {
  const lines: string[] = [];
  lines.push(`# Design Brief`);
  lines.push('');
  lines.push(`**Prompt:** ${result.prompt}`);
  lines.push('');
  lines.push(`## Detected Salesforce Intent`);
  lines.push('```json');
  lines.push(JSON.stringify(result.intent, null, 2));
  lines.push('```');
  lines.push('');
  lines.push(`## Variants`);
  for (const v of result.variants) {
    lines.push(`### ${v.label} (\`${v.componentName}\`)`);
    lines.push(v.description);
    lines.push('');
    lines.push(`**Rationale:** ${v.designRationale}`);
    lines.push('');
    lines.push(`**Diagnostics:**`);
    for (const d of v.diagnostics) lines.push(`- ${d}`);
    lines.push('');
    lines.push(`**Deploy Notes:**`);
    for (const d of v.deployNotes) lines.push(`- ${d}`);
    lines.push('');
  }
  if (result.warnings.length) {
    lines.push(`## Warnings`);
    for (const w of result.warnings) lines.push(`- ${w}`);
  }
  const target = path.join(exportRoot, 'design-brief.md');
  await ensureDir(exportRoot);
  await fs.writeFile(target, lines.join('\n'), 'utf8');
  return target;
}

export async function writePromptTranscript(result: GenerationResult, exportRoot: string): Promise<string> {
  await ensureDir(exportRoot);
  const target = path.join(exportRoot, 'prompt.json');
  await fs.writeFile(
    target,
    JSON.stringify(
      {
        prompt: result.prompt,
        intent: result.intent,
        selectedVariantId: result.selectedVariantId,
        warnings: result.warnings,
        nextActions: result.nextActions,
      },
      null,
      2,
    ),
    'utf8',
  );
  return target;
}

export interface ExportAllOptions {
  exportRoot: string;
  projectName?: string;
}

export async function exportGenerationResult(
  result: GenerationResult,
  opts: ExportAllOptions,
): Promise<{ root: string; variantPaths: string[] }> {
  const root = path.join(opts.exportRoot, opts.projectName ?? 'accountIntelligenceConsole');
  await ensureDir(root);
  const variantPaths: string[] = [];
  for (const v of result.variants) {
    variantPaths.push(await writeVariantBundle(v, root));
  }
  await writeDesignBrief(result, root);
  await writePromptTranscript(result, root);
  return { root, variantPaths };
}

export async function writePreviewHtml(result: GenerationResult, previewDir: string): Promise<string[]> {
  await ensureDir(previewDir);
  const written: string[] = [];
  for (const v of result.variants) {
    const target = path.join(previewDir, `${v.componentName}.html`);
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${v.label} · ${v.componentName}</title>
<link rel="stylesheet" href="https://unpkg.com/@salesforce-ux/design-system@2.24.4/assets/styles/salesforce-lightning-design-system.min.css" />
<style>body{margin:0;font-family:'Salesforce Sans',-apple-system,BlinkMacSystemFont,sans-serif;background:#f3f3f3;}${v.previewCss ?? ''}</style>
</head>
<body class="slds-scope">
${v.previewHtml}
</body>
</html>`;
    await fs.writeFile(target, html, 'utf8');
    written.push(target);
  }
  return written;
}
