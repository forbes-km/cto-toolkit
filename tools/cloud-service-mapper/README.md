# Cloud Service Mapper

A single-file, dependency-free reference tool for translating capabilities and services across AWS, Azure, GCP, and OCI, plus a side-by-side landing zone and foundational best-practices guide.

## Run it

No build step, no dependencies. Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## What it does

**Service mapper tab:** 79 capabilities across compute, storage, database, networking, messaging and integration, identity and security, observability, containers and developer tools, data and analytics, AI/ML, and governance and cost, each mapped to its closest equivalent service across all four major providers. Filter by provider, search by capability or service name. Includes backup, disaster recovery orchestration, edge compute functions, transactional email, push notifications, managed Airflow, PaaS web app hosting, static site hosting, NAT gateway, and Microsoft Fabric as a unified analytics platform, added in a coverage pass alongside the original core categories.

Reflects a recent accuracy pass correcting several stale mappings: deprecated or renamed services (Google Cloud Functions to Cloud Run functions, Azure Cognitive Search to Azure AI Search, Deployment Manager to Infrastructure Manager, StorSimple retirement, App Mesh wind-down, Open Service Mesh retirement, Anthos Service Mesh rebrand) and one row where the same Azure service had been mapped to two different capabilities (Logic Apps was listed for both workflow orchestration and iPaaS; workflow orchestration now correctly points to Durable Functions). Full list of corrections is in the footer of the tool itself.

**Landing zone and best practices tab:** eight foundational building blocks every cloud landing zone needs before workloads land on it, account and subscription structure, identity foundation, network topology, logging and audit baseline, security guardrails, cost management, tagging governance, and landing zone automation, each with a short, concrete best-practice description for how it's typically implemented on each provider.

## What it's for

Choosing among providers, translating an architecture diagram from one provider's vocabulary to another's during a multi-cloud or migration conversation, quickly orienting a team member who knows one provider well and is ramping on another, or standing up a new cloud foundation and wanting a starting checklist of what a mature landing zone actually covers.

## Limitations

Provider service catalogs and landing zone tooling evolve constantly. Naming changes, feature parity is rarely exact even where a mapping looks clean, and this is not exhaustive. Landing zone descriptions reflect common, current reference patterns (Control Tower, Azure Landing Zones, Cloud Foundation Fabric, OCI Landing Zones) rather than a specific implementation; treat this as a starting point for a conversation with the relevant provider's current documentation and your own architecture review, not a substitute for either.

## License

MIT. See the repository root LICENSE for the terms covering this specific tool, which differ from the rest of the repository.
