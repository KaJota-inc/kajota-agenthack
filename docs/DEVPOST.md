# Devpost submission copy — Kajota Settle

**Track:** UiPath Maestro Case (Track 1)
**Repo:** https://github.com/KaJota-inc/kajota-agenthack

## Tagline
Agentic case management that turns an informal co-sell handshake into a governed, exception-aware settlement — for African micro-commerce.

## Inspiration
Across African markets, wholesale deals between merchants are agreed over a photo and a promise: no shared record, no verification, no FX clarity, frequent disputes and defaults. The settlement *process* is dynamic and exception-heavy — exactly the shape case management exists for. We wanted to show UiPath Maestro orchestrating AI agents, automated integrations, and humans across that messy real-world flow.

## What it does
Kajota Settle runs one co-sell deal end-to-end as a **Maestro Case** with five stages:
1. **Intake** — an agent extracts structured deal terms from a photo + notes.
2. **Verify** — merchant lookup + an agent risk/KYC decision; risky cases route to a human.
3. **Price** — an agent computes the settlement amount with cross-currency FX; out-of-band prices route to a human for approval.
4. **Settle** — an agent selects the rail (fiat payout or on-chain mesh escrow) and an API workflow executes it idempotently; failures escalate to a human.
5. **Fulfill** — delivery confirmation closes the case; disputes re-enter as an exception.

Humans stay in the loop exactly where judgment matters; agents and integrations do the rest.

## How we built it
- **UiPath Maestro Case** as the orchestration + governance layer.
- **Agent Builder**: 4 agents (Deal Intake, Risk & Compliance, Pricing & FX, Settlement Orchestration), each returning strict JSON so the case branches on their decisions.
- **Action Center** human tasks for the four exception paths.
- **API Workflows** (no RPA/robot needed) for merchant lookup, FX, settlement execution, and delivery confirmation.
- **Cross-platform**: settlement can route to Kajota's on-chain mesh escrow (Sepolia), with UiPath as the orchestrator over a Web3 rail.
- Built with **Claude Code** as the coding agent (see CLAUDE_CODE_USAGE.md).

## Challenges
Designing a case that is genuinely *exception-driven* rather than a fixed sequence, and keeping it runnable on Automation Cloud without an unattended robot (solved by using agents + API workflows + human tasks only).

## Accomplishments
A complete, governed case lifecycle — including the unhappy paths — that maps a real, underserved business problem onto agentic orchestration.

## What's next
Wire the live Kajota merchant registry and the production mesh escrow contract; add SLA-driven escalations and a People's-Choice-ready public demo.

## Built with
UiPath Maestro, UiPath Agent Builder, UiPath Action Center, UiPath API Workflows, UiPath Automation Cloud, Anthropic Claude, Claude Code, Ethereum (mesh escrow).
