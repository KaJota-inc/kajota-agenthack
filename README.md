# Kajota Settle

**Agentic case management for co-sell deal settlement in African micro-commerce.**
UiPath AgentHack 2026 · Track 1: UiPath Maestro Case.

> Two merchants agree a wholesale deal over a photo and a promise. **Kajota Settle** turns that informal handshake into a governed, exception-aware case — extracted, risk-scored, priced across currencies, settled (fiat or on-chain), and reconciled — with humans kept in the loop exactly where they matter.

## What it is

A UiPath **Maestro Case** that runs one co-sell deal from intake to close. AI agents do the cognitive work (extraction, risk, pricing, rail selection); **Action Center** human tasks handle the exceptions; **API Workflows** execute settlement and reconciliation. UiPath Automation Cloud is the orchestration and governance layer.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full case design and stage diagram.

## UiPath components used

| Component | Role |
|---|---|
| **Maestro Case** | The `Co-Sell Deal` case: 5 stages (Intake → Verify → Price → Settle → Fulfill) + exception transitions |
| **Agent Builder** | 4 agents: Deal Intake (vision), Risk & Compliance, Pricing & FX, Settlement Orchestration |
| **Action Center** | Human-in-the-loop tasks: merchant verification, price approval, settlement escalation, dispute resolution |
| **API Workflows** | Merchant registry lookup, FX rate, settlement execution, notification |
| **LLM connection** | Backs the Agent Builder agents |

> **Agent type:** Maestro-orchestrated multi-agent case (Agent Builder agents coordinated by a Maestro Case definition), with human-in-the-loop via Action Center. No UI/RPA automation — all integrations are API Workflows, so no unattended robot is required.

## Cross-platform integration

Stage 4 can settle to **Kajota's on-chain mesh escrow** (Ethereum/Mantle Sepolia) as a pluggable settlement rail, alongside fiat payout — demonstrating UiPath as the orchestration layer over a Web3 settlement primitive.

## Built with Claude Code

This repository — architecture, agent prompts, API-workflow specs, and documentation — was authored with **Claude Code** (Anthropic) as the coding agent. See [`docs/CLAUDE_CODE_USAGE.md`](docs/CLAUDE_CODE_USAGE.md) for the documented workflow (AgentHack coding-agent bonus).

## Setup

> Prerequisite: a UiPath **Automation Cloud** tenant with the **Enterprise Trial** activated (Maestro execution requires it; the trial is self-serve and instant at `cloud.uipath.com`).

1. Sign in to Automation Cloud → enable **Studio Web**, **Maestro/Processes**, **Agents**, **Action Center**.
2. Import the case definition and agents from this repo (see `agents/` and `workflows/`).
3. Configure the **LLM connection** for the agents.
4. Configure API Workflow endpoints (merchant registry, FX, settlement) — use the mock endpoints in `workflows/mocks/` for a self-contained demo.
5. Publish and run the `Co-Sell Deal` case; submit a sample deal from `assets/sample-deals/`.

## Demo

- Video (≤5 min): _TBD_
- Sample deal inputs: `assets/sample-deals/`

## License

MIT — see [`LICENSE`](LICENSE).
