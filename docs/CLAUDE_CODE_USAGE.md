# Coding agent usage — Claude Code

Per the AgentHack bonus criterion (up to +2 points for documented coding-agent use), this project was built with **Claude Code** (Anthropic's agentic CLI) as the coding agent.

## What Claude Code did

- **Requirements verification** — read the canonical Devpost rules and reconciled conflicting docs/forum posts on UiPath Maestro licensing (Community vs Enterprise Trial), de-risking the platform path.
- **Case design** — produced the Track-1 Maestro Case architecture in `docs/ARCHITECTURE.md`: stages, exception transitions, agent/human/API handoffs, and scope decisions (no-RPA path to avoid a Windows robot dependency).
- **Agent authoring** — wrote the four Agent Builder system prompts (`agents/prompts.md`) with strict-JSON contracts so Maestro can branch on agent output.
- **API workflow specs & mocks** — defined the merchant-lookup, FX, settlement, and notification workflow contracts and mock endpoints for a self-contained demo.
- **Repo + docs** — README, license, sample deal inputs, and this document.

## Evidence

Commit history in this repository reflects the Claude Code authoring session. Prompts and design artifacts are versioned alongside the UiPath project exports.
