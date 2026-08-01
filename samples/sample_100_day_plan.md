# 100-Day Remediation Plan — Sample Output

*This is a fully synthetic example generated from fictional data, produced here to show the shape of the output. It is not derived from any real engagement.*

**Deal context:** Northwind Health Analytics (fictional) · Strategic acquisition · Indicative deal value $85M · Primary thesis: capability acquisition · Integration lead: TBD

---

## Plan summary

| Phase | Item count | Critical | Significant | Material |
|---|---|---|---|---|
| Phase 1 (Days 1-30) | 6 | 3 | 2 | 1 |
| Phase 2 (Days 31-60) | 5 | 0 | 4 | 1 |
| Phase 3 (Days 61-100) | 4 | 0 | 1 | 3 |

---

## Phase 1: Days 1-30

### RF-014 — Expired security certifications
**Domain:** Security · **Severity:** Critical · **Effort:** M (~180 engineer-days) · **Owner:** CISO / Security Lead

**Rationale:** Critical severity combined with a detected regulatory-urgency signal (certification lapse affects customer contractual commitments). Placed in Phase 1 because unresolved certification gaps carry immediate customer and contractual exposure that compounds the longer they remain open.

**Success criteria:** Certification renewed or compensating control documented and accepted by the deal team within 30 days.

---

### F-003 — Key engineering leadership concentrated in two individuals
**Domain:** Organization · **Severity:** Critical · **Effort:** S (~60 engineer-days, retention-focused) · **Owner:** CTO / VP Engineering

**Rationale:** Retention-urgency signal detected (key person concentration). Placed in Phase 1 because the window for retention conversations narrows quickly after close; delaying past 30 days materially increases flight risk.

**Success criteria:** Retention conversations completed with both individuals; written commitments in place or a documented transition risk plan if commitments are not secured.

---

### RF-027 — Missing employee IP assignment agreements
**Domain:** IP · **Severity:** Critical · **Effort:** M (~180 engineer-days, legal-led) · **Owner:** General Counsel

**Rationale:** IP exposure flagged as a pre-close cleanup item; unresolved assignment gaps create downstream ownership ambiguity that becomes harder and more expensive to unwind post-integration.

**Success criteria:** Assignment agreements executed for all affected current employees; historical exposure assessed and documented.

---

*(Remaining Phase 1 items: DS-002 Disaster recovery untested in 18 months; RF-041 Unremediated high-severity penetration test findings; F-009 Breach notification process undocumented — full detail in complete output.)*

---

## Phase 2: Days 31-60

### F-011 — Legacy monolith constrains integration timeline
**Domain:** Architecture · **Severity:** Significant · **Effort:** XL (~1,080 engineer-days) · **Owner:** CTO / VP Engineering

**Rationale:** Significant severity, not deal-blocking on its own, but drives integration complexity and cost. Sequenced to Phase 2 to allow architecture options analysis to complete before committing engineering capacity.

**Success criteria:** Integration architecture decision documented and approved; phase 3 execution plan scoped against the decision.

---

*(Remaining Phase 2 items: DS-005 Cost optimization opportunity in cloud spend; F-015 Customer-facing SLA gaps; RF-033 Manual operational processes in billing reconciliation; DS-007 Compliance training records incomplete — full detail in complete output.)*

---

## Phase 3: Days 61-100

### IC-002 — Data model incompatibility between platforms
**Domain:** Integration · **Severity:** Significant · **Effort:** XL (~1,080 engineer-days) · **Owner:** CTO / VP Engineering

**Rationale:** Foundational architecture work with a longer time horizon. Dependency resolution confirmed this item depends on the Phase 2 integration architecture decision (F-011) and is correctly sequenced after it.

**Success criteria:** Data model reconciliation approach documented; migration or federation plan in place with committed timeline.

---

*(Remaining Phase 3 items: DS-009 Modernization roadmap for two legacy services; F-018 Vendor consolidation opportunity; RF-046 Documentation debt in partner-facing APIs — full detail in complete output.)*

---

## Notes on this sample

- Item IDs (RF-, F-, DS-, IC-) indicate source: red flag, logged finding, domain score synthesis, and integration complexity, respectively, consistent with the source workbook structure.
- Effort sizing (XS through XXL) maps to engineer-day ranges; dollar-level cost projection is a separate output layer not shown here.
- This sample omits roughly two-thirds of a typical full plan for length; a real 100-day plan for a deal this size typically runs 12-18 items across the three phases.

*Generated from a populated Technology DD Scoring Workbook using the Diligence Prioritization Engine described in the main repository catalog.*
