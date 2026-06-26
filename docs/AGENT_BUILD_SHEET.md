# Agent build sheet — 4 Agent Builder agents

For each agent: in the **Agents** app → **Build your agent now** (or Studio Web → New → **Agent**), then in the **Definition** view set Name, paste the **System prompt** from [`agents/prompts.md`](../agents/prompts.md), pick the **Model**, and define **Inputs/Outputs** as below. Then **Publish**.

> Model: pick **Anthropic Claude** if listed (best for these JSON-contract prompts); otherwise the default GPT-class model is fine. Community has a daily LLM-call cap — keep test runs lean.

> Output: set the agent's output to **structured JSON** matching the schema in the prompt, so the Maestro Case can branch on fields (e.g. `decision`, `in_band`, `extraction_confidence`).

---

## Agent 1 — Deal Intake Agent
- **Name:** `Deal Intake Agent`
- **Description:** Extracts structured deal terms from a photo + notes.
- **System prompt:** §1 of `agents/prompts.md`.
- **Inputs:** `photo` (image/file), `notes` (string).
- **Outputs (JSON):** `items[]`, `asking_price`, `currency`, `counterparty_name`, `notes`, `extraction_confidence`.
- **Gate the case uses:** `extraction_confidence < 0.6` → exception task **Correct Deal**.

## Agent 2 — Risk & Compliance Agent
- **Name:** `Risk & Compliance Agent`
- **Description:** KYC + fraud + credit scoring; decides auto vs human review.
- **System prompt:** §2 of `agents/prompts.md`.
- **Inputs:** `deal` (object), `submitter_record` (object), `counterparty_record` (object).
- **Outputs (JSON):** `risk_score`, `kyc_ok`, `flags[]`, `decision` (`auto_approve`|`human_review`), `rationale`.
- **Gate:** `decision == human_review` → exception task **Manual Verification**.

## Agent 3 — Pricing & FX Agent
- **Name:** `Pricing & FX Agent`
- **Description:** Computes settlement amount with cross-currency FX + fees.
- **System prompt:** §3 of `agents/prompts.md`.
- **Inputs:** `deal` (object), `price_band` (object), `fee_schedule` (object), `fx_rate` (number).
- **Outputs (JSON):** `priced_goods_value`, `fx_rate`, `platform_fee`, `settlement_amount`, `settlement_currency`, `in_band`, `breakdown`.
- **Gate:** `in_band == false` → exception task **Approve Price**.

## Agent 4 — Settlement Orchestration Agent
- **Name:** `Settlement Orchestration Agent`
- **Description:** Chooses settlement rail (fiat vs on-chain mesh escrow) + execution plan.
- **System prompt:** §4 of `agents/prompts.md`.
- **Inputs:** `settlement_amount` (number), `settlement_currency` (string), `payout_prefs` (object), `rail_availability` (object).
- **Outputs (JSON):** `rail` (`fiat_payout`|`mesh_escrow`), `idempotency_key`, `execution_plan`, `requires_human_escalation_on_failure`.
- **On failure of the downstream Execute Settlement workflow:** exception task **Escalate Settlement**.

---

## After publishing all four
Tell me the exact published agent names. Then in the **Maestro Case** designer, bind each **Agent task** (from the case build sheet) to its agent:
- Intake → Extract Deal → **Deal Intake Agent**
- Verify → Assess Risk → **Risk & Compliance Agent**
- Price → Compute Settlement → **Pricing & FX Agent**
- Settle → Select Rail & Execute → **Settlement Orchestration Agent**
