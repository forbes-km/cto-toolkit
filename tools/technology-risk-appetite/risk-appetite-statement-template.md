# Technology Risk Appetite Statement

**Organization:** 

**Version and date:** 

**Approved by (executive team / board committee):** 

**Owner:** 

**Next review date:** 

*Replace the example thresholds with your own. Every statement should be checkable by an engineer without asking anyone. Terms follow ISO 31000, COSO ERM, and NIST CSF 2.0.*

---

## 1. Purpose and scope

**What this statement covers (systems, entities, AI, vendors):** 

**What it does not cover:** 

**Link to enterprise risk management policy:** 

## 2. Risk capacity

*Set by the CFO and board. The appetite must sit well below it.*

**Maximum loss the organization could absorb in a year without threatening viability:** 

**Commitments that must never be breached (licenses, regulatory status, major contracts):** 

## 3. The five tiers and who can accept each

| Tier | Definition | Who can accept |
|---|---|---|
| Will not accept | Downside unacceptable regardless of likelihood | No one; standing prohibition |
| Accept temporarily | Known, tracked, with a remediation date and owner | Accountable owner per decision-rights model |
| Monitor | Acceptable at current severity, tracked in case it changes | Team closest to the risk |
| Board visibility | Crosses a stated materiality threshold | Surfaced to the board or risk committee |
| CEO approval | Could affect viability or a public commitment | CEO only, never delegated |

## 4. Will-not-accept list

*Short and absolute. Examples below; keep only what you mean.*

- Regulated data unencrypted at rest or in transit
- Regulated data unmasked in non-production environments
- A revenue-critical system with no tested recovery plan
- Standing global administrator access without phishing-resistant MFA
- A customer-facing generative AI feature with no evaluation, human escalation path, or logging

## 5. Appetite statements and key risk indicators

| Category | Appetite statement | KRI | Green | Amber | Red | Owner |
|---|---|---|---|---|---|---|
| Vulnerabilities | Known-exploited vulnerabilities on internet-facing systems fixed or mitigated within 14 days | Overdue KEV items | 0 | 1 to 3 | >3 | CISO |
| Resilience | Every tier-1 system restore-tested within its RTO in the last 12 months | Tier-1 systems untested | 0 | 1 | >1 | CTO |
| Third parties | No production or regulated-data access without a completed security review | Reviews overdue | 0 to 2 | 3 to 5 | >5 | CISO |
| End of life | No internet-facing component >90 days past end of support without a named exception | Components past EOL | 0 | 1 to 2 | >2 | CTO |
| AI | No customer-facing AI ships without evaluation, escalation path, and logging | AI systems missing controls | 0 | 1 | >1 | AI owner |
| Concentration | No vendor supports more than two of our five most critical capabilities without a tested exit plan | Vendors over limit | 0 | 1 | >1 | CTO |
|  |  |  |  |  |  |  |

## 6. Materiality and board visibility

**Dollar exposure that triggers board visibility:** 

**Regulatory or disclosure triggers (for example SEC Form 8-K Item 1.05 materiality process):** 

**Escalation path and timing (who calls whom, within how long):** 

## 7. Temporary acceptance register

*Every temporary acceptance needs a date. A missed date escalates one tier automatically.*

| Risk | Tier | Compensating controls | Owner | Remediation date | Times extended |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |

## 8. Review

- Reviewed annually with the strategy reset, and after any of: first regulated data, first enterprise customer security addendum, an acquisition, a material incident
- KRIs reported monthly to the executive team and quarterly to the board or risk committee

---

*Template from the CTO Toolkit Technology Risk Appetite page. Thresholds are examples only. MIT licensed.*
