# CTO Toolkit

A reference library for CTOs, enterprise architects, and other technology leaders: 68 pages of frameworks, decision guides, in-browser calculators, and downloadable templates, built from 20+ years of running and assessing enterprise technology platforms.

Live site: https://forbes-km.github.io/cto-toolkit/

It is a static GitHub Pages site. No build step, no dependencies, no tracking. Every calculator runs in the browser and sends nothing anywhere.

## How it is organized

Every page lives at `tools/<slug>/index.html`. The root `index.html` is the catalog, in six sections:

| Section | Covers |
|---|---|
| AI systems | Architecture, governance, FinOps, and portfolio management for AI initiatives |
| Cloud and enterprise architecture | EA operating model, application portfolio, architecture review and principles, integration patterns, technical debt economics, cloud cost, data strategy, the Cloud Service Mapper |
| Risk and resilience | Security program, identity and access architecture, zero-trust and compliance maturity, GRC, observability and SRE operating model, disaster recovery, reliability economics, data governance, the regulatory map |
| Planning and diligence | ADRs and roadmapping, stakeholder engagement, business cases, vendor evaluation, SaaS renewal negotiation, technology M&A diligence, the diligence kit, and post-merger integration |
| Leading the enterprise | The CEO and CFO relationships, the CTO operating system, decision rights, capital allocation, risk appetite, succession, board reporting |
| General CTO practice | Technology strategy, org design, engineering culture, hiring and leveling, engineering metrics, build vs buy, platform engineering, systems thinking |

Six situational entry points at `tools/situation-*` resequence the catalog around a moment instead of a topic: starting as CTO, cutting costs, going through M&A, introducing AI, a major incident, and rapid growth. Each one has the decisions with dates, the questions to ask, the trap, and what should exist at each checkpoint.

Three pages explain the whole: **Epistemology and Research Methods** is the thinking behind everything else, **Decision Architecture** shows how the pages fit together, and the **Toolkit Reference Map** says what each page gives you before you open it.

## What is runnable

- **Interactive calculators** embedded in their pages: application portfolio scoring, AI initiative classification, zero-trust and EA maturity, security and compliance maturity, GRC common-control effort, business case NPV and IRR, capital allocation, reliability and disaster recovery cost-benefit, cloud FinOps maturity, vendor scoring, stakeholder mapping, technical debt ranking and multi-year sequencing, and a regulatory applicability filter
- **Downloadable templates** (.md and .docx): ADR, incident postmortem, vendor evaluation scorecard, technology strategy, business case one-pager
- **Downloadable workbooks** (.xlsx, formula-driven): technology capital allocation, cloud FinOps
- **A sample board reporting deck** (.pptx), synthetic throughout, built to the structure the Board Reporting page describes
- **Cloud Service Mapper**: a dependency-free reference translating 79 capabilities across AWS, Azure, GCP, and OCI, with a landing zone comparison

## Site search

`assets/search.js` and `assets/search-index.json` provide client-side search from the home page. The index is a flat JSON array with one entry per page (`url`, `title`, `section`, `badge`, `description`, `body`). When a page is added or changed, regenerate its entry; there is no build step that does it automatically.

## Depth and provenance

Pages range from focused reference material to full frameworks with worked examples, calculators, and templates. Several state where they are a preview of a fuller instrument, with the complete version, scoring, and facilitation available through direct engagement rather than published here.

The synthesis, judgment, and conclusions are original; where a page builds on a published framework (Gartner's TIME, McKinsey's Three Horizons, DORA, NIST, Team Topologies, the FinOps Framework, and others) it names the source. AI was used as a synthesis tool to compress a much larger private corpus into shareable pages, not to generate the thinking. Regulatory dates and provider feature names are checked at review time and stated as of that date; verify against primary sources before relying on them.

## Contributing

Corrections are welcome as issues or pull requests, especially for stale provider service names, regulatory changes, and broken links. Each page carries a "Last reviewed" date in its footer.

## License

MIT, for everything in this repository. See [`LICENSE`](./LICENSE). The unpublished material that some pages describe as available through direct engagement is not in the repository and is not covered.
