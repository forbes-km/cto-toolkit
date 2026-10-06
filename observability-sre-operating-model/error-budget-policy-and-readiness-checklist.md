# Error Budget Policy and Production Readiness Checklist

**Service or service group:** 

**Product owner:** 

**Engineering owner:** 

**Version and date:** 

**Signed by (executive who owns the roadmap):** 

*The policy only works if it is signed before the month starts. Burn-rate alerting thresholds follow the multiwindow approach in Google's SRE Workbook.*

---

## Part A: Error budget policy

### 1. Service level objectives

| SLI (measured from the user side) | Objective | Window | Error budget per window |
|---|---|---|---|
| Successful checkout requests within 2 seconds (example) | 99.9% | 30 days | 43.2 minutes |
|  |  |  |  |
|  |  |  |  |

### 2. Alerting

- Page when the budget burns 14.4 times faster than sustainable over 1 hour, or 6 times over 6 hours
- Ticket when it burns faster than sustainable over 3 days
- Cause-level signals (CPU, disk, queue depth) go to dashboards, not the pager

### 3. When the budget is exhausted

- Feature releases for the service pause, except fixes and security patches
- The team works on the reliability items named in the latest postmortems and the toil backlog
- Releases resume when the budget has recovered to [X] percent, or when the product owner and engineering owner jointly sign an exception
- An exception is logged with its reason and reviewed at the next monthly review

### 4. When the budget is healthy

- The team may take more release risk (larger changes, faster rollout) within the SLO
- Consistently unused budget for a quarter triggers a review of whether the SLO is too loose or reliability spend too high

### 5. Review

**Monthly review attendees:** 

**Quarterly SLO review date:** 

## Part B: Production readiness checklist

*A service passes before it takes production traffic. Record evidence, not intentions.*

| Item | Evidence (link) | Done |
|---|---|---|
| SLOs defined, agreed with the product owner, and on a dashboard |  |  |
| Alerts tied to SLOs; every page has a runbook |  |  |
| On-call rota at least six deep, named, and paid per policy |  |  |
| Structured logs, metrics, and traces with a propagated correlation ID |  |  |
| Dashboards built from the standard template |  |  |
| Dependencies declared, with timeouts, retries with backoff, and circuit breakers |  |  |
| Backups configured and a restore tested within the RTO |  |  |
| Capacity forecast and a load test before the first known peak |  |  |
| Security review complete; secrets in a vault; least-privilege identity |  |  |
| Rollback path tested; feature flags for risky changes |  |  |
| Telemetry cost budget set for the service |  |  |
| Data classification recorded; residency respected in backups and replicas |  |  |

---

*Template from the CTO Toolkit Observability and SRE Operating Model page. MIT licensed.*
