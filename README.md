# CTO Toolkit

A working library of frameworks, templates, and interactive tools for enterprise technology leadership, built over 20+ years of running and assessing enterprise technology platforms, including eight years as CTO of a global healthcare platform and ongoing technical due diligence work on both buy-side and sell-side transactions.

Live site: https://forbes-km.github.io/cto-toolkit/

---

## Structure

Every page lives under `/tools/<page-slug>/index.html`. There's no separate category-folder structure, the root `index.html` is the full index, organized into six sections:

| Section | Covers |
|---|---|
| AI systems | Architecture, governance, cost modeling, and portfolio management for AI initiatives |
| Cloud & enterprise architecture | EA operating model, application portfolio, architecture review, cloud cost, data strategy |
| Risk & resilience | Security program, zero-trust and compliance maturity, disaster recovery, reliability economics |
| Planning & diligence | Roadmapping, stakeholder engagement, vendor evaluation, technology M&A diligence and integration |
| Leading the enterprise | CEO/CFO relationships, decision rights, capital allocation, risk appetite, succession, board reporting |
| General CTO practice | Org design, engineering culture, hiring, engineering metrics, build vs buy, platform engineering |

Six situational entry points (`/tools/situation-*`) resequence the same catalog around a specific moment instead of a topic: starting as CTO, cutting costs, going through M&A, introducing AI, a major incident, rapid growth.

`CONTENT-GOVERNANCE.md` tracks every page: type, deploy status, cross-link dependencies, and known limitations. It's updated each time a page ships or changes meaningfully, and is the source of truth for what's live versus still in progress.

---

## What's runnable

- **15 interactive calculators**, embedded directly in their pages, no separate app: application portfolio scoring, AI initiative classification (Scale/Incubate/Watch/Kill), zero-trust and EA maturity assessment, security and compliance maturity, business case NPV/IRR, capital allocation modeling, reliability and disaster-recovery cost-benefit, cloud FinOps maturity, vendor evaluation, and stakeholder mapping, among others
- **Downloadable templates** (.md and .docx): ADR, incident postmortem, vendor evaluation scorecard, technology strategy, business case one-pager
- **Downloadable workbooks** (.xlsx, formula-driven, not static exports): technology capital allocation, cloud FinOps
- **A sample board reporting deck** (.pptx), illustrative figures, structure matches the board reporting page's own guidance
- **Cloud Service Mapper**: a dependency-free reference tool translating capabilities across AWS, Azure, GCP, and OCI, including a landing zone comparison covering identity, network, guardrails, and subscription/account/project vending

---

## Depth varies by design

Pages range from focused reference material to full frameworks with worked examples, interactive tools, and downloadable templates. Some pages state explicitly where they're a preview of a fuller framework, with the complete version, custom scoring, and facilitation, available through direct engagement, rather than published in full.

---

## Samples

Redacted or fully synthetic example outputs live alongside the tools that produce them rather than in a separate folder, the sample board deck is the clearest example: a complete, illustrative deck built to the structure the Board Reporting page describes, labeled as synthetic throughout.

---

## License

MIT licensed throughout, catalog content and code alike. See [`LICENSE`](./LICENSE) for full terms.
