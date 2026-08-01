# CTO Toolkit: Cloud Modernization, Enterprise Architecture & M&A Diligence

A working library of methods, templates, and scoring instruments built over 20+ years of running and assessing enterprise technology platforms, including eight years as CTO of a global healthcare platform and ongoing technical due diligence work on both buy-side and sell-side transactions.

Most of what's cataloged here is described at the methodology level rather than distributed in full. Working versions, including scoring engines, configurable weighting tables, and facilitation guides, are maintained as part of an active advisory practice and are available through direct engagement. A few things in here are real and runnable right now: see **Open tools** below.

---

## Categories

| Folder | What's in it |
|---|---|
| [`/ai-governance`](./ai-governance) | AI and LLM governance framework for regulated environments |
| [`/modernization-cloud`](./modernization-cloud) | Cloud migration, modernization, integration patterns, FinOps |
| [`/planning-communication`](./planning-communication) | Board reporting, roadmaps, business cases, ADRs |
| [`/stakeholder-vendor`](./stakeholder-vendor) | Stakeholder engagement and vendor evaluation |
| [`/technology-diligence`](./technology-diligence) | Technology M&A diligence and post-merger integration, including two ML-augmented tools |
| [`/enterprise-architecture`](./enterprise-architecture) | Capability modeling, EA operating model, EA and security maturity assessments |

Each folder has its own README with the full list and description for that category.

## Open tools

- [`/tools/cloud-service-mapper`](./tools/cloud-service-mapper) - a real, dependency-free, MIT-licensed reference tool for translating cloud service capabilities across AWS, Azure, GCP, and OCI. Open `index.html` in a browser, no build step.

## Samples

- [`/samples`](./samples) - redacted or fully synthetic example outputs from the tools described above, so they can be evaluated by what they produce.

## How the pieces connect

`/assets_data_flow.svg` shows how the diligence and technical debt tools chain together: a populated scoring workbook feeds a prioritization or optimization engine, which produces a sequenced, rationale-backed plan.

## License

Catalog content (methodology descriptions, playbooks, templates) is all rights reserved, evaluation only. Code inside `/tools` is MIT licensed. Full terms in [`LICENSE`](./LICENSE).
