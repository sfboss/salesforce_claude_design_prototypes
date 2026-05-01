import { generateFromPrompt } from '@lwc-design-studio/variant-engine';
import { writePreviewHtml, exportGenerationResult } from '@lwc-design-studio/exporters';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const DEMO_PROMPT = `Create a Lightning Web Component mockup for an Account Intelligence Console. It should show account health, open opportunities, recent cases, risk signals, next best actions, related contacts, and an executive summary card. Make it feel like something a Salesforce architect would show to a VP of Sales.`;

async function main() {
  const result = generateFromPrompt(DEMO_PROMPT);

  const generatedRoot = path.join(repoRoot, 'generated');
  const lwcRoot = path.join(generatedRoot, 'lwc');
  await fs.mkdir(lwcRoot, { recursive: true });

  // Write each variant's LWC bundle to generated/lwc/<componentName>/
  for (const v of result.variants) {
    const compDir = path.join(lwcRoot, v.componentName);
    await fs.mkdir(compDir, { recursive: true });
    for (const file of v.files) {
      // strip the force-app/main/default/lwc/<name>/ prefix
      const baseName = path.basename(file.path);
      await fs.writeFile(path.join(compDir, baseName), file.content, 'utf8');
    }
  }

  // Write static previews
  const previews = await writePreviewHtml(result, path.join(generatedRoot, 'previews'));

  // Write a summary
  const summary = {
    prompt: DEMO_PROMPT,
    intent: result.intent,
    variantCount: result.variants.length,
    variants: result.variants.map((v) => ({
      id: v.id,
      label: v.label,
      componentName: v.componentName,
      files: v.files.map((f) => f.path),
    })),
    warnings: result.warnings,
    nextActions: result.nextActions,
  };
  await fs.writeFile(
    path.join(generatedRoot, 'demo-summary.json'),
    JSON.stringify(summary, null, 2),
    'utf8',
  );

  console.log(`Generated ${result.variants.length} variants.`);
  for (const v of result.variants) console.log(`  • ${v.componentName} (${v.label})`);
  console.log(`Previews written: ${previews.length} files in generated/previews/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
