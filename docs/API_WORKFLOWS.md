# API Workflow build sheet — 4 system integrations

Build these as **API Workflow** projects in Studio Web (New → API Workflow). Each is a small request→transform→response flow. For a **self-contained demo**, point them at the mock endpoints (see `workflows/mocks/`); the "Real target" column shows where they'd hit production Kajota services.

> API Workflows run without an unattended robot — this is the deliberate no-RPA design choice that keeps the whole solution runnable on Automation Cloud without a Windows machine.

| Workflow | Used in stage | Inputs | Output | Real target |
|---|---|---|---|---|
| **Lookup Merchants** | Verify | `submitter_id`, `counterparty_id` | two merchant records (KYC status, history, disputes) | Kajota mobile-backend `/merchants/{id}` |
| **Fetch FX Rate** | Price | `from_ccy`, `to_ccy` | `rate` (number), `as_of` | FX provider / Chainlink price feed |
| **Execute Settlement** | Settle | `rail`, `amount`, `currency`, `idempotency_key` | `status`, `tx_ref` | Fiat payout API **or** Kajota mesh escrow (Sepolia) |
| **Confirm Delivery** | Fulfill | `deal_id` | `delivered` (bool), `confirmed_at` | Kajota fulfillment webhook |

## 1. Lookup Merchants
```
GET {MERCHANT_API}/merchants/{submitter_id}
GET {MERCHANT_API}/merchants/{counterparty_id}
-> merge into { submitter_record, counterparty_record }
```
Mock returns: submitter KYC-verified, clean history; counterparty KYC-verified, 1 prior on-time deal. (Swap counterparty to `unverified` to demo the **Manual Verification** exception path.)

## 2. Fetch FX Rate
```
GET {FX_API}/rate?from={from_ccy}&to={to_ccy}
-> { rate, as_of }
```
Mock: `NGN->GHS = 0.0094` (i.e. 480,000 NGN ≈ 4,512 GHS before fee).

## 3. Execute Settlement (idempotent)
```
POST {SETTLE_API}/settlements
  body: { rail, amount, currency, idempotency_key }
-> { status: "settled" | "failed", tx_ref }
```
- `rail = fiat_payout` → mock payout returns `settled` with a payout ref.
- `rail = mesh_escrow` → mock returns a Sepolia-style `tx_ref` (the on-chain integration target; real call would submit to the Kajota mesh escrow contract).
- To demo the **Escalate Settlement** exception, the mock can return `failed` once, then `settled` on retry (idempotency_key dedupes).

## 4. Confirm Delivery
```
GET {FULFILL_API}/deals/{deal_id}/delivery
-> { delivered, confirmed_at }
```
Mock: `delivered = true`. (Set `false` to demo the **Resolve Dispute** exception path.)

## Mocks
Put simple JSON responders (or static JSON) under `workflows/mocks/`. A free option: a small JSON-server or a public mock like `https://run.mocky.io`. Keep the base URLs in Studio Web **Assets** so they're easy to swap demo→real.
