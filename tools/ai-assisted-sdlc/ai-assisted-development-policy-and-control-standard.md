# AI-Assisted Development Policy and Pipeline Control Standard

**Organization:** 

**Policy owner (engineering):** 

**Control owner (platform or security):** 

**Version and date:** 

**Approved by:** 

*Part A is the policy engineers follow. Part B is the control standard the platform and security teams implement and verify. Bracketed values are starting points to set for your organization. Everything in Part B should be enforced by tooling, not by memory.*

---

## Part A: Policy for engineers

### 1. Scope

This policy applies to any AI tool used to plan, write, review, test, build, release, or operate software for [organization], including code completion, chat assistants, local agents, background agents, and agents triggered by the pipeline. It applies to employees, contractors, and vendors working in our repositories.

### 2. Approved tools

| Tool | Approved uses | Autonomy level allowed | Enterprise terms in place (no training on our code, retention stated) | Owner |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |

- Only tools on this list may be used with our code, data, or systems
- Personal accounts and unapproved extensions may not be used with company code
- New tools are requested through [process] and reviewed by security and procurement

### 3. Data rules

- Never put secrets, credentials, or keys in a prompt, instruction file, or agent context
- Never put customer data, personal data, or regulated data into an AI tool unless the tool is approved for that data class
- Proprietary code may be used only with approved tools under enterprise terms
- When in doubt, treat the data as restricted and ask

### 4. Responsibility

- The engineer who submits a change is responsible for it, whoever or whatever wrote it
- AI-assisted changes meet the same review, testing, and security standards as any other change
- Do not approve a change you have not read and understood, however clean it looks

### 5. Disclosure

- Mark AI-assisted and agent-authored changes with an `Assisted-by: <tool and model>` commit trailer (our convention, similar to the Linux kernel and Fedora practice) or the pull request label `ai-assisted`
- Agent-authored commits link to the agent session log

### 6. Agents

- Agents run only in approved sandboxes, never on a laptop that holds standing credentials
- Do not turn off an agent's permission prompts outside an approved sandbox
- You may review an agent's pull request that you requested, but your approval does not count toward merge
- Report any agent action that surprised you to [channel]

### 7. Dependencies

- Do not add a package an AI suggested until you have confirmed it exists, is the package you intended, and is maintained
- All installs go through the registry proxy

### 8. Exceptions

Exceptions are requested through [process], approved by the policy owner and the control owner, time-limited to [90] days, and logged.

---

## Part B: Pipeline control standard

### 9. Autonomy levels and required controls

| Level | Description | Controls required before use |
|---|---|---|
| 1. Completion | Inline suggestions in the editor | Approved tools; secret and dependency scanning in CI |
| 2. Chat and edit | Explanations and multi-line edits the developer applies | Level 1, plus data rules published and known |
| 3. Local agent | Plans and edits many files, runs commands in the developer's environment | Level 2, plus isolated environment with no standing credentials; dependency admission; instruction files under code ownership |
| 4. Background agent | Works unattended from a ticket and opens a pull request | Level 3, plus agent identity; scoped short-lived tokens; own branch; blocking scans; separation of duties on approval; provenance on every commit; change size limits |
| 5. Pipeline agent | Triggered by pipeline events; narrow classes may auto-merge | Level 4, plus failure and rework rates measured by provenance; kill switch; auto-merge allowlist reviewed [quarterly] |

### 10. Agent identity and permissions

| Control | Standard | Verified by |
|---|---|---|
| Identity | Each agent has its own identity; no agent acts on a person's token | Audit log shows agent identity on every action |
| Credentials | Short-lived, scoped to one repository, least privilege; no production credentials | Token configuration review |
| Environment | Ephemeral sandbox per task, destroyed afterwards | Platform configuration |
| Network | Egress allowlist: registry proxy, source host, model endpoint | Network policy |
| Tools and MCP servers | Allowlisted, version-pinned; new local servers require consent | Allowlist under code ownership |
| Branches | Agents push only to their own branch; cannot merge, approve, or deploy | Branch protection and rulesets |
| Destructive actions | No deletion of data or resources, no force-push; development and production data separate | Permission review |
| Workflow runs | Agent pull requests run workflows only after a human approves | Repository settings |
| Logging | Session logs retained [12 months] and linked from commits | Spot check monthly |
| Kill switch | One action revokes an agent's access everywhere; tested [quarterly] | Test record |

No agent may hold all three of: access to private data, exposure to untrusted content, and the ability to communicate externally.

### 11. Pipeline gates

| Gate | Standard |
|---|---|
| Change size | Pull requests over [400] changed lines are split or require a second reviewer |
| Static analysis | Runs on every change; high-severity findings block merge |
| Secret scanning | Runs on every change and on push; findings block merge |
| Dependency admission | New packages resolved through the registry proxy; must exist, be older than [30] days, and pass malware and vulnerability checks |
| Instruction files | Rules, instruction, and assistant configuration files are code-owned and checked for hidden or bidirectional Unicode characters |
| Pipeline files | Workflow and policy files are code-owned; agents cannot modify them |
| Privileged triggers | No privileged workflow triggers run untrusted pull request content |
| Review | At least one human approval from someone other than the requester; code owners on [authentication, payments, infrastructure] paths |
| Tests | Changed lines have tests; assertions reviewed; mutation testing on [critical services] |
| Provenance | Build provenance signed by the hosted build platform |

### 12. Measurement

Record a baseline before rollout, then report monthly, broken down by provenance where possible:

| Measure | Baseline | Current | Owner |
|---|---|---|---|
| Change failure rate |  |  |  |
| Deployment rework rate |  |  |  |
| Median pull request size |  |  |  |
| Median review wait |  |  |  |
| Share of merged changes AI-assisted or agent-authored |  |  |  |
| Escaped defects by provenance |  |  |  |
| Security findings by provenance |  |  |  |
| Rejected dependency additions |  |  |  |
| Model spend per merged change |  |  |  |

### 13. Cost

- Each team or cost center has a monthly AI tooling budget of [amount], with an alert at [80] percent
- Spend is reviewed with cloud spend, and reported per merged change and per agent session

### 14. Review

This standard is reviewed [every six months] and after any incident involving an AI tool or agent. Changes are recorded with their reason.

---

## Part C: Rollout checklist

- [ ] Inventory of AI tools in use, including personal accounts and extensions
- [ ] Approved tool list and data rules published
- [ ] Baseline delivery metrics recorded
- [ ] Secret, dependency, and static analysis scanning blocking on every repository
- [ ] Registry proxy with dependency admission policy in place
- [ ] Instruction and rules files under code ownership, with hidden-character checks
- [ ] Agent sandboxes with their own identity, scoped tokens, and egress allowlist
- [ ] Provenance labels or trailers, and session logs linked from commits
- [ ] Separation of duties enforced for agent pull requests
- [ ] Budgets and alerts on AI tooling spend
- [ ] Pilot of background agents on one narrow class of work, with results reported
- [ ] Decision to widen scope recorded in an ADR

*Template from the CTO Toolkit AI-Assisted SDLC and Delivery Pipelines page. MIT licensed.*
