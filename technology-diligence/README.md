# Technology Due Diligence and M&A Integration

- **M&A Technology Due Diligence Playbook** - the umbrella playbook describing how a technology diligence engagement runs end to end, tying the question bank, scoring workbook, and data room work into a single process.
- **Technology DD Process Map** - a visual map of the technology diligence workflow, from engagement kickoff through findings delivery to the deal team.
- **Technology Due Diligence Scoring Workbook** - an eight-domain, weighted scoring instrument for confirmatory and exclusivity diligence on technology acquisitions, with a red-flag pattern library and a scoring-to-cost/timeline translation for integration complexity.
- **Technical Debt Assessment Framework** - the underlying methodology behind the technical debt scoring used across the diligence and portfolio tools in this repository.
- **Technical Debt, Risk & Application Portfolio Simulator** - a quantitative model for scoring technical debt priority and classifying an application portfolio using the Gartner TIME framework, with an independent risk layer covering vendor and knowledge-concentration exposure.
- **Technical Debt, Risk & Application Portfolio Simulator** (M&A variant) - the same scoring approach adapted to the specific data and decisions relevant during a live transaction.
- **Technical Debt Carry Cost Optimizer** - an optimization tool that takes a technical debt portfolio and produces a multi-year remediation plan that minimizes total cost (carry cost, remediation cost, and expected incident cost) within real annual budget and engineering capacity constraints. Built for CTOs making actual multi-year budget decisions rather than qualitative debt discussions, and designed so every sequencing decision can be explained rather than treated as a black box.
- **Diligence Question Bank** - over 300 questions across architecture, security, compliance, data, operations, organization, IP, and healthcare-specific domains, organized by priority and interview vs. document request.
- **Diligence Response Tracker** - a companion tracker for logging target-company responses to the Diligence Question Bank and following up on incomplete or concerning answers.
- **Integration Architecture Decision Tree** - a decision framework for choosing an integration approach (consolidate, coexist, replace) based on the specifics of the deal and the two technology estates involved.
- **Healthcare M&A Technology Reference** - a reference covering the healthcare-specific technology and regulatory considerations, HIPAA, HITRUST, BAAs, state licensure, that apply across the diligence and integration lifecycle.
- **Data Room Organization Template** - a four-tier access model and full folder structure for organizing a technology-focused data room, usable from either side of a transaction.
- **Sell-Side Technology Preparation Guide** - a guide for preparing a technology organization and its data room for a buyer's due diligence process, the sell-side counterpart to the buy-side diligence tools above.
- **100-Day Post-Merger Integration Timeline** - a phased plan (continuity, stabilization and discovery, execution) with workstream-level milestones through the first 100 days after close, including a dedicated healthcare compliance track.
- **Post-Merger Integration Playbook** - the broader integration playbook that the 100-Day Timeline and PMI Tracker execute against, covering integration strategy and workstreams beyond the first 100 days.
- **PMI Tracker** - a working dashboard for tracking integration workstreams, key person retention, synergy realization, and decision logs against the integration plan.
- **Diligence Prioritization Engine** - an ML-augmented tool that takes a populated Technology DD Scoring Workbook and produces a sequenced, rationale-backed 100-day remediation plan. Built for PE operating partners, fractional CTOs, and integration management offices who need to turn diligence findings into an actionable roadmap rather than a flat list. Uses an inspectable, reproducible classifier by design, chosen specifically so every phase placement can be explained and defended rather than treated as a black box.

A sample output showing what the Diligence Prioritization Engine produces (synthetic data) is at `/samples/sample_100_day_plan.md`. A diagram showing how the diligence and technical debt pipelines connect is at `/assets_data_flow.svg`.

*Full working workbooks, scoring engines, and ML tools are available through direct engagement. See the repository root README for the complete catalog and license terms.*
