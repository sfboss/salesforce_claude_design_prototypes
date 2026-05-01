# AGENTS.md — LWC Design Studio

This repository implements a local Salesforce LWC mockup studio.

- Runtime: local only, no org auth.
- Primary entrypoint: `pnpm dev`.
- Core flow: prompt -> intent parsing -> variant generation -> preview -> export.
- Exports target: `force-app/main/default/lwc/` structure.
