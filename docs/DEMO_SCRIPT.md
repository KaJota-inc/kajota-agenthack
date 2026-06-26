# Demo script — Kajota Settle (target ≤ 4:30, hard cap 5:00)

Record in UiPath Automation Cloud. Show the case running, not slides. Narrate the business value as the case advances.

## 0:00–0:30 — Hook + problem
"Two African merchants agree a wholesale deal over a photo and a promise. No shared record, no verification, no FX clarity — disputes and defaults are common. Watch UiPath Maestro turn that into a governed case." Show the Maestro Case plan (5 stages) on screen.

## 0:30–1:15 — Intake
Submit `deal-001` (photo + notes). Show the **Deal Intake Agent** extracting structured terms (items, price, currency, counterparty) with a confidence score. Note: low confidence would route to a human — show the exception transition on the canvas.

## 1:15–2:10 — Verify (human-in-the-loop)
Show **Lookup Merchants** running, then the **Risk & Compliance Agent** returning a risk decision JSON. Trigger the unverified-counterparty path once to show the **Manual Verification** task landing in Action Center; approve it as the risk officer. Emphasize: humans only where judgment matters.

## 2:10–3:00 — Price
Show **Fetch FX Rate** + the **Pricing & FX Agent** computing the settlement amount across NGN→GHS with fees, and the `in_band` gate. Briefly show the out-of-band → **Approve Price** path.

## 3:00–3:50 — Settle (the cross-platform moment)
Show the **Settlement Orchestration Agent** choosing the rail. Switch to `mesh_escrow` and show **Execute Settlement** producing an on-chain tx ref — "UiPath orchestrating a Web3 settlement rail." Show a failure → **Escalate Settlement** retry to prove idempotency + exception handling.

## 3:50–4:20 — Fulfill + close
**Confirm Delivery** → case closes, both merchants notified. Show the completed case timeline (audit trail) — the governance story.

## 4:20–4:30 — Close
"One informal deal, fully governed: extracted, risk-scored, priced, settled, reconciled — agents and humans, orchestrated by UiPath. Built with Claude Code." Show the GitHub repo URL.

## Recording tips
- Pre-stage the case so each step is fast; cut dead air in editing.
- Keep the canvas visible so judges see the agentic orchestration, not just outputs.
- Caption each stage name as you reach it.
