# LWC Design Studio

A local Claude Design–style mockup studio for **Salesforce Lightning Web Components**.
Describe a Salesforce UI in plain English and get five realistic LWC design variants —
rendered live in your browser using SLDS, with deployable-shaped source files you can
drop into a Salesforce DX project.

```text
Prompt → Salesforce intent → 5 LWC variants → live preview → export bundle
```

## Screenshots

_Add screenshots to `docs/screenshots/` after first run._

- Studio shell (left = prompt, center = preview, right = files, bottom = variants)
- Variants: Standard Record Page · Console Dense · Executive Dashboard · Mobile Card Stack · Vibe-Coded Premium

## Quickstart

```bash
pnpm install
pnpm dev                # launches the studio at http://localhost:5173
pnpm generate:demo      # writes 5 LWC bundles + previews into ./generated
pnpm export:demo        # writes a full export to ./exports/accountIntelligenceConsole
pnpm test               # runs intent + variant engine tests
pnpm build              # builds the studio
```

## Architecture

```text
apps/studio                  Vite + React workbench (prompt, preview, files, variants)
packages/salesforce-intent   Deterministic prompt → SalesforceIntent parser
packages/slds-patterns       SLDS-flavored HTML primitives + canonical mock data
packages/variant-engine      Builds 5 LwcVariants (HTML/JS/XML/CSS/README/JSON) + previews
packages/lwc-runtime         Wraps a variant's preview HTML into an iframe-safe document
packages/exporters           Writes variant bundles, design brief, prompt transcript, previews
packages/prompt-kernels      Reusable SKILL.md kernels
scripts/                     Node entrypoints for `generate:demo` and `export:demo`
generated/                   Output of `pnpm generate:demo`
exports/                     Output of `pnpm export:demo`
```

## Supported Salesforce UI Patterns

App shell · Record page · Highlights panel · Path progress · Related list · Lightning card ·
Metric card · Datatable · Modal · Toast region · Empty state · Inline edit row · Activity timeline ·
Case feed · Opportunity pipeline panel · Risk signal panel · Next best action card · Flow screen
layout · Setup/admin table · Permission matrix · Deployment status panel.

## How Generation Works

1. The prompt is parsed deterministically into a `SalesforceIntent`.
2. The variant engine selects SLDS patterns and assembles five canonical variants.
3. Each variant emits a deployable-shaped LWC bundle plus a self-contained static SLDS
   preview HTML used by the studio's iframe and by `pnpm export:demo`.
4. Diagnostics + deploy notes describe what would need real org wiring.

The first vertical slice ships with the canonical Account Intelligence dataset so the
demo is reproducible without an LLM.

## Exporting LWC Files

```bash
pnpm export:demo
# → exports/accountIntelligenceConsole/
#     design-brief.md
#     prompt.json
#     previews/<componentName>.html
#     variants/<componentName>/force-app/main/default/lwc/<componentName>/
#         <componentName>.html
#         <componentName>.js
#         <componentName>.js-meta.xml
#         <componentName>.css
#         README.md
#         mockData.json
```

## Copying into a Salesforce DX project

Each variant nests its files under `force-app/main/default/lwc/<componentName>/`, so
copy that directory straight into your DX repo:

```bash
cp -R exports/accountIntelligenceConsole/variants/accountIntelligenceConsoleStandard/force-app/main/default/lwc/accountIntelligenceConsoleStandard \
      /path/to/your/dx-project/force-app/main/default/lwc/
```

Replace inline mock arrays with `@wire(getRecord)` / Apex calls before production.

## Known Limitations

- The preview is **static SLDS HTML**, not the LWC OSS runtime.
- Intent parser is keyword-based (deterministic on purpose).
- Mock data ships pre-canned; custom datasets are roadmap.
- Browser export downloads files individually; use `pnpm export:demo` for full
  filesystem export.

## Roadmap

- LWC OSS runtime preview behind a feature flag.
- Optional LLM adapter for intent + mock-data generation.
- Diff-between-variants view, prompt history, screenshot regression tests.
- Org-describe-aware metadata variant (uses uploaded describe JSON).
- Apex stub + UI API wire adapter generation alongside the LWC bundle.
