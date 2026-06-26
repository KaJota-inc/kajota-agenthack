# Kajota Settle — Architecture (UiPath AgentHack Track 1: Maestro Case)

## The business problem

Across African micro-commerce, **co-sell / wholesale deals between merchants are settled informally** — a photo of goods on WhatsApp, a verbal price, a promise to pay. These deals are:

- **Exception-heavy**: missing/inconsistent documents, unverified counterparties, multi-currency (NGN/GHS/KES/USD) FX, credit risk, disputes.
- **Multi-actor**: two merchants, a settlement rail, a risk officer, and increasingly AI agents.
- **High-stakes but low-trust**: no shared system of record, so disputes and defaults are common.

This is exactly the shape Maestro **Case Management** is built for: a long-running case that moves through stages with handoffs between **AI agents, automated workflows, and humans**, where the *path is data-dependent and exception-driven* rather than a fixed sequence.

## The case: one co-sell deal, end to end

A **Deal Case** is opened when a merchant submits a deal (photo of goods/invoice + counterparty + asking price). The case advances through stages; exceptions route to humans via Action Center; settlement executes via API workflows (optionally to Kajota's on-chain mesh escrow).

```
                ┌──────────────────────── MAESTRO CASE: "Co-Sell Deal" ───────────────────────┐
                │                                                                              │
 [Merchant]──▶  │  Stage 1        Stage 2          Stage 3        Stage 4        Stage 5       │ ──▶ [Both
  submit deal   │  INTAKE     ▶   VERIFY      ▶    PRICE     ▶    SETTLE     ▶   FULFILL        │     merchants
  (photo+terms) │  ───────        ──────           ─────          ──────         ───────       │      notified]
                │  Intake         Risk &           Pricing        Settlement     Close &        │
                │  Agent          Compliance       & FX           Orchestration  Reconcile      │
                │  (vision LLM)   Agent            Agent          Agent + API     workflow       │
                │     │              │                │              │               │           │
                │     ▼              ▼                ▼              ▼               ▼           │
                │  extract       auto-pass?       in-band?       rail OK?        delivered?     │
                │  terms          └─no─▶ HUMAN     └─no─▶ HUMAN    └─no─▶ HUMAN    └─no─▶ DISPUTE │
                │                   verify task      approve task    retry/escalate  resolution │
                └──────────────────────────────────────────────────────────────────────────────┘
```

### Stage 1 — Intake (Deal Intake Agent)
- **Agent (vision LLM)** extracts structured deal terms from the submitted photo + free text: items, quantities, asking price, currency, counterparty name.
- Outputs a typed `Deal` object onto the case. Low-confidence extraction → **human correction task**.

### Stage 2 — Verify (Risk & Compliance Agent)
- **API workflow** looks up both merchants in the Kajota merchant registry.
- **Agent** runs KYC + fraud heuristics + a credit score.
- **Decision gate**: risk below threshold → auto-advance. Above threshold or unverified counterparty → **Action Center human task** (risk officer reviews and approves/rejects).

### Stage 3 — Price (Pricing & FX Agent)
- **Agent** computes the settlement amount: line-item pricing, platform fee, and **cross-currency FX** (API workflow fetches live rate).
- **Decision gate**: amount within agreed band → auto-advance. Out-of-band / disputed price → **human approval task**.

### Stage 4 — Settle (Settlement Orchestration Agent)
- **Agent** selects the settlement rail (fiat payout **or** Kajota **on-chain mesh escrow** on Sepolia — the cross-platform integration).
- **API workflow** executes settlement and polls for confirmation.
- **Exception**: rail failure / timeout → retry policy, then **escalate to human**.

### Stage 5 — Fulfill & Close
- **API workflow** confirms delivery and reconciles.
- Delivered → close case, notify both merchants. Not delivered / disputed → **Dispute Resolution** human task (re-enters the case as an exception path).

## Why this wins on the rubric

| Criterion | How this design scores |
|---|---|
| **Business Impact** | Real, large, underserved market (African micro-commerce settlement). Tangible: fewer defaults, faster settlement, audit trail. |
| **Platform Usage** | Maestro Case + Agent Builder agents + Action Center human tasks + API Workflows. External LLM via agents. Optional on-chain escrow = cross-platform. |
| **Technical Execution** | Data-dependent stage routing, exception handling, human-in-the-loop, idempotent settlement with retry. |
| **Completeness** | Full case lifecycle intake→close, including the unhappy paths. |
| **Creativity** | Agentic settlement for the *informal* economy; on-chain rail as a pluggable settlement option. |
| **Bonus (+2)** | Entire repo + agent prompts authored with **Claude Code** — documented in README. |

## Deliberate scope decisions (3-day window)

- **No UI/RPA automation** → no Windows unattended robot dependency. All non-agent work is **API Workflows** + **Action Center** human tasks. This is the single biggest de-risking choice for the platform setup.
- **Settlement rail**: demo the agent's *decision* + an API-workflow call. On-chain escrow shown as the integration target; can stub to a mock endpoint if the live mesh call is flaky during demo.
- **Reuse from Kajota**: domain model, agent prompts (extraction/pricing/risk logic adapted from Coach Agent), and the mesh escrow contract as the settlement endpoint.

## UiPath components checklist (for README + judging)

- [ ] Maestro **Case** definition with 5 stages + exception transitions
- [ ] Agent Builder: **Deal Intake**, **Risk & Compliance**, **Pricing & FX**, **Settlement Orchestration** agents
- [ ] LLM connection configured (model + key)
- [ ] **Action Center** human tasks: Verify, Price Approval, Settlement Escalation, Dispute
- [ ] **API Workflows**: merchant lookup, FX rate, settlement execution, notification
- [ ] Tenant: Studio Web project published + runnable on Automation Cloud
