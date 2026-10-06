# AI Use Case Intake Form

**Intake ID:** 

**Date submitted:** 

**Requested by (name, team):** 

**Accountable business owner:** 

**Target go-live date:** 

*Complete one form per AI use case, including AI features switched on inside a product you already buy. Section numbers map to the AIGP Body of Knowledge v2.1 competencies on the AI Governance Map. The governance forum uses Sections 1 to 6 to assign a risk tier; Section 7 records the decision.*

---

## 1. Use case and purpose (I.A, III.A)

*Describe it so someone outside your team could explain it back.*

**What the system does, in one sentence:** 

**Business problem it solves and how success will be measured:** 

**Who uses it, and who is affected by its output:** 

**Decision it informs or makes (and whether a person reviews it first):** 

**What it must never be used for:** 

## 2. Your role and the system type (I.B, IV.A)

| Question | Answer |
|---|---|
| Are we building, buying, or enabling a feature in a product we already license? |  |
| Our role for this system: developer, provider, deployer, or user |  |
| Model type: classical ML, generative, general-purpose model, or agentic |  |
| Will we fine-tune, rebrand, or change the intended purpose of a vendor model? (may make us a provider) |  |
| Deployment option: SaaS feature, managed API, cloud-hosted, self-hosted open weights, on-device |  |
| Vendor and model name and version, if known |  |

## 3. Data (II.A, III.B)

| Question | Answer |
|---|---|
| Data used for training, fine-tuning, retrieval, or prompts (list sources) |  |
| Does any of it include personal data? Special category or sensitive data? |  |
| Lawful basis and purpose compatibility confirmed by privacy (yes / no / pending) |  |
| Does the vendor train on our data or retain prompts and outputs? For how long? |  |
| Where is the data processed and stored (regions)? |  |
| Named data owner for each source |  |

## 4. Impact and harm screen (I.A, III.A, IV.B)

*Answer yes or no. Any yes in rows 1 to 6 normally places the use case in Tier 3 or 4.*

| # | Screening question | Yes / No |
|---|---|---|
| 1 | Does it affect employment, credit, insurance, housing, education, healthcare, or access to essential services? |  |
| 2 | Does it make or materially shape a decision about a person without human review? |  |
| 3 | Does it use biometric data or infer emotions, health, or other sensitive traits? |  |
| 4 | Could an error cause physical harm, financial loss, or a legal consequence for someone? |  |
| 5 | Is it customer-facing, or does it act (send, buy, change records) without approval? |  |
| 6 | Is it in a regulated product or regulated process (medical device, safety component, financial reporting)? |  |
| 7 | Does it generate content the public will see (text, images, audio, video)? |  |
| 8 | Would a failure be hard to reverse once it reaches a customer or record? |  |

## 5. Applicable rules (II.A to II.C)

*Privacy and legal complete this section.*

- [ ] GDPR or other privacy law (DPIA needed?)
- [ ] EU AI Act: prohibited, high-risk (Annex I or III), transparency (Article 50), or minimal
- [ ] US state rules (for example Colorado SB 26-189, California ADMT regulations, NYC Local Law 144)
- [ ] Sector rules (HIPAA, FDA, fair lending, insurance, securities)
- [ ] Contractual commitments to customers about AI use
- [ ] None identified (state why)

## 6. Controls proposed (III.C, IV.C)

- [ ] Evaluation against a written rubric before release
- [ ] Human review or approval step (describe the tier)
- [ ] Output guardrails (schema, citations, content filters)
- [ ] Logging sufficient to reconstruct any output
- [ ] Monitoring for drift, groundedness, and misuse in production
- [ ] Disclosure to users that they are interacting with AI
- [ ] Tested kill switch and rollback to a prior version
- [ ] Vendor contract terms reviewed (training on data, retention, change notice, indemnity)

## 7. Governance decision (for the forum)

| Field | Entry |
|---|---|
| Risk tier assigned (1 low to 4 high) |  |
| Decision: approve / approve with conditions / pilot only / decline |  |
| Conditions and required controls |  |
| Impact assessment required (privacy, AI, fundamental rights) |  |
| Re-assessment date |  |
| Approved by (name, role, date) |  |

---

*Template from the CTO Toolkit AI Governance Map, aligned to the IAPP AIGP Body of Knowledge v2.1. Not legal advice; confirm applicability with counsel. MIT licensed.*
