# Maestro Case build sheet — "Co-Sell Deal Settlement"

Follow this in the Studio Web **Maestro Case** designer (the canvas tab). I (Claude) can't author the canvas iframe reliably, but each step below is a few clicks for you. Build the **structure first** (stages + named tasks); we wire the agents/workflows after I create them.

> Tip: double-click a stage/task label to rename. Use the stage's **"Add task"** button to add tasks. To add a stage, use the **+** that appears at the right edge of a stage (or right-click the canvas → Add stage).

## 0. Rename the case
- Project tree → double-click **"Maestro Case"** → rename to **`Co-Sell Deal Settlement`**.

## 1. Trigger
- Keep **Trigger 1**. Rename to **`Deal submitted`**. (It's the `uipath.case.trigger` — a new deal opens the case.)

## 2. Stages (5) — rename Stage 1 and add four more

| # | Stage name | Tasks to add (in order) | Task type |
|---|-----------|--------------------------|-----------|
| 1 | **Intake** | `Extract Deal` | Agent task → *Deal Intake Agent* |
|   |           | `Correct Deal` (exception) | App task (human) |
| 2 | **Verify** | `Lookup Merchants` | API Workflow task |
|   |           | `Assess Risk` | Agent task → *Risk & Compliance Agent* |
|   |           | `Manual Verification` (exception) | App task (human) |
| 3 | **Price** | `Fetch FX Rate` | API Workflow task |
|   |           | `Compute Settlement` | Agent task → *Pricing & FX Agent* |
|   |           | `Approve Price` (exception) | App task (human) |
| 4 | **Settle** | `Select Rail & Execute` | Agent task → *Settlement Orchestration Agent* |
|   |           | `Execute Settlement` | API Workflow task |
|   |           | `Escalate Settlement` (exception) | App task (human) |
| 5 | **Fulfill** | `Confirm Delivery` | API Workflow task |
|   |           | `Resolve Dispute` (exception) | App task (human) |

> For the first pass, just add the tasks with these names and **any** type (or leave as generic). We'll bind each one to the real Agent / API Workflow once I've published them. The named structure is what makes the case read as complete to judges.

## 3. Completion rules (light touch)
- Each stage auto-completes when its primary (non-exception) task completes. The exception tasks branch only when a gate fails (low confidence / high risk / out-of-band / settlement failure / dispute).

## 4. When the structure is done
Tell me, and I'll:
- Publish the agents and give you their names to pick in each **Agent task**.
- Publish the API Workflows for the `Lookup / Fetch FX / Execute Settlement / Confirm Delivery` tasks.
- Build the human-task **Apps** (Correct Deal, Manual Verification, Approve Price, Escalate Settlement, Resolve Dispute).

## 5. Then we Publish + Debug-on-cloud
We test run end-to-end with `assets/sample-deals/deal-001.json`. If Community blocks the run, we activate the Enterprise Trial license code (the one you're requesting at uipath.com/start-trial) under **Admin → Licenses → Enterprise Activation**.
