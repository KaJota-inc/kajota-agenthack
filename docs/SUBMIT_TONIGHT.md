# Submit tonight — lean UiPath plan (grace window: Jul 1, 04:00 WAT)

**Effective working time: aim to finish by ~01:00 WAT for buffer (~10 hrs).** Target tier: Best First-Time Builder / People's Choice / Honorable Mention — not grand prize. Stay lean; do not build the full 5-stage case.

> Division of labor: **you build in Studio Web** (foreground tab — the canvas only renders there). I've prepped every input below + drive GitHub/Devpost.

---

## Phase 0 — De-risk the license FIRST (~30 min, do before anything else)
The one unknown that can sink the night: **can Community publish/run a Maestro Case, or do you need the Enterprise Trial code?**

1. Confirm the **late-submission link loads** while logged in: open the link from the Devpost Updates post. If it 404s or rejects you, stop and tell me.
2. In Studio Web → **Create New → Maestro Case**. Add one trivial agent task. Click **Publish**.
   - **If Publish succeeds** → Community works; proceed to Phase 1 with this project.
   - **If it demands Enterprise** → go to uipath.com/start-trial, get the license code by email, paste it at **Admin → Licenses → Enterprise Activation**, then retry. (Ping me — I can drive the activation page.)

Don't move on until a trivial case publishes.

---

## Phase 1 — Build the LEAN case (~2–3 hrs)
Track 1 Maestro Case named **`Co-Sell Deal Settlement`**. **Only 3 stages** (collapse the 5 into the spine):

| Stage | Primary task | Type |
|---|---|---|
| **Intake & Decision** | `Decide Deal` | Agent task → **Deal Decisioning Agent** (below) |
| **Approve** | `Human Approval` | Action Center (human) — only triggered if agent flags `needs_human: true` |
| **Settle & Close** | `Execute Settlement` | API Workflow (or a script task hitting the mock) |

That's one agent + one human task + one settlement call. Keep exception handling to the single `needs_human` branch. This is a valid, complete, demoable Track-1 case.

### The one agent — Deal Decisioning Agent
Create one Agent (Agent Builder), paste this as the instructions, model = Anthropic Claude if available else default, output = JSON:

```
You are the Deal Decisioning Agent for Kajota Settle, settling co-sell deals between
African micro-merchants. Given a deal (items, asking price, currency, counterparty) plus
both merchants' KYC/history and a settlement FX rate, do the full decision in one pass:
extract/normalize terms, score risk, compute the settlement amount with FX + fee, and
choose the settlement rail. Be conservative; never invent prices or counterparties.

Return ONLY this JSON:
{
  "deal_summary": str,
  "risk_score": number,           // 0-100, higher = riskier
  "needs_human": boolean,         // true if either merchant unverified, risk_score>40, or price out of band
  "settlement_amount": number,
  "settlement_currency": str,
  "rail": "fiat_payout" | "mesh_escrow",
  "rationale": str
}
```

Inputs to wire: `deal`, `submitter_record`, `counterparty_record`, `price_band`, `fx_rate` (use `assets/sample-deals/deal-001.json` + `workflows/mocks/*.json` as test values).

---

## Phase 2 — Publish + run (~1 hr)
Publish the case. **Debug on cloud** with `deal-001` values. Capture: agent returns JSON → `needs_human=false` path settles via `mesh_escrow` → case closes. (Flip counterparty to `mch_unverified_0001` once to show the human-approval branch.)

---

## Phase 3 — Demo video (~1 hr, ≤5 min, aim 3)
Screen-record in Automation Cloud. Follow `docs/DEMO_SCRIPT.md` but compressed to the 3 stages. Upload to YouTube **unlisted**. Narrate the business value as the case runs.

---

## Phase 4 — Submit on Devpost (~45 min)
Use the late-submission link. Fill from `docs/DEVPOST_FIELDS.md` (copy-paste). Attach repo + video + deck. Add evaluators if prompted. **Submit with buffer before 04:00 WAT.**
