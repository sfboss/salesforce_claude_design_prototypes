import { generateFromPrompt } from '@lwc-design-studio/variant-engine';
import { exportGenerationResult, writePreviewHtml } from '@lwc-design-studio/exporters';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const DEMO_PROMPT = `Create a Lightning Web Component mockup for an Account Intelligence Console. It should show account health, open opportunities, recent cases, risk signals, next best actions, related contacts, and an executive summary card. Make it feel like something a Salesforce architect would show to a VP of Sales.`;

async function main() {
  const result = generateFromPrompt(DEMO_PROMPT);
  const exportsDir = path.join(repoRoot, 'exports');
  const { root, variantPaths } = await exportGenerationResult(result, {
    exportRoot: exportsDir,
    projectName: 'accountIntelligenceConsole',
  });
  await writePreviewHtml(result, path.join(root, 'previews'));
  console.log(`Exported to: ${root}`);
  for (const p of variantPaths) console.log(`  • ${p}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
