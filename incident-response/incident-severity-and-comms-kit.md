# Incident Severity Matrix and Communications Kit

**Organization:** 

**Version and date:** 

**Owner:** 

**Incident declaration command or link:** 

*Adapt the definitions to your services before an incident, not during one. Severity is set by impact, not cause. When in doubt, declare higher and downgrade later.*

---

## 1. Severity matrix

| Severity | Definition | Response | Who is told, and when |
|---|---|---|---|
| SEV1 | Full outage, data loss, or confirmed breach affecting most customers, or any incident with regulatory or public-disclosure consequence | IC within 5 minutes; all relevant responders paged; bridge and channel opened | CTO and CEO immediately; counsel and CISO if data involved; status page within 30 minutes |
| SEV2 | Significant degradation, a subset of customers fully affected, or a core internal system down in business hours | IC assigned; core responders paged; channel opened | CTO within the hour; customers when impact is confirmed |
| SEV3 | Minor degradation with a workaround, or elevated errors below the SLO threshold | Owning team in business hours; tracked as an incident | Engineering leadership in weekly review |
| SEV4 | No customer impact; near miss worth recording | Normal workflow; logged | Team only; incident log |

## 2. Roles for SEV1 and SEV2

| Role | Owns | Named rota or person |
|---|---|---|
| Incident commander | Coordination and decisions; approves production changes; declares resolution. Does not debug. |  |
| Operations lead | Investigation and fix; proposes actions to the IC |  |
| Communications lead | Every message leaving the bridge; keeps the cadence |  |
| Scribe | Live timeline of actions, decisions, and times |  |
| Security lead (security incidents) | Containment and evidence preservation; separate private channel |  |
| Counsel (data or regulatory) | Notification decisions and review of external statements |  |

## 3. Communication cadence (SEV1)

| Audience | Cadence | Include | Leave out |
|---|---|---|---|
| Status page and customers | Within 30 minutes, then every 30 to 60 minutes | What is affected, workaround, next update time | Cause theories, internal names, fix-time promises |
| Executives | Every 30 minutes or on change in impact | Customer and revenue impact, current action, decisions needed, clocks running | Technical detail beyond one sentence |
| Internal company | Declaration, resolution, major change | What to tell customers who call | The bridge link |
| Regulators and counsel | As soon as data or a reportable category is plausible | Facts and times from the timeline | Speculation |

## 4. Status page templates

### Investigating

We are investigating [degraded performance / an outage] affecting [product or feature]. [Workaround, if any.] Our next update will be at [time, timezone].

### Identified

We have identified the cause of the issue affecting [product or feature] and are applying a fix. [Customers may still see ...] Next update at [time].

### Monitoring

A fix has been applied and [product or feature] is recovering. We are monitoring to confirm full recovery. Next update at [time].

### Resolved

The issue affecting [product or feature] between [start] and [end] [timezone] has been resolved. [One sentence on impact.] We will publish a summary of what happened and what we are changing [by date].

## 5. Executive update template

**Severity and time declared:** 

**Customer and revenue impact (in business terms):** 

**Current action and next check-in time:** 

**Decision needed from you (or none):** 

**Notification clocks that may be running (GDPR 72 hours, SEC 4 business days after materiality, HIPAA, state law, contracts):** 

## 6. Resolution checklist

- [ ] Customer-facing metrics within SLO for 30 minutes (SEV1)
- [ ] Backlog or queue drained
- [ ] Mitigation documented with an owner for the permanent fix
- [ ] Timeline complete
- [ ] Notification log complete
- [ ] Postmortem scheduled within five working days

---

*Template from the CTO Toolkit Incident Response page. Pair with the postmortem template. MIT licensed.*
