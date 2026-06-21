# GitHub Copilot in VS Code: Technical Feature Coverage TODOs

Use this checklist to avoid missing important Copilot and Agent capabilities in a full-day seminar. Each item is designed for a short, live demonstration.

## Research Basis (what this checklist is built from)
- VS Code AI features cheat sheet
- VS Code agent overview and chat mechanics docs
- VS Code custom instructions and agent skills docs
- GitHub Docs: Copilot agents and customization
- Microsoft Learn Copilot learning paths and modules
- GitHub Skills: Getting Started with GitHub Copilot

## A) Core Chat and Agent Surfaces
- [ ] Chat view vs Inline Chat vs Quick Chat: show when each surface is better.
- [ ] Agents window vs Chat view: run one task from each and compare workflow.
- [ ] Switch agent type/session config: show agent, model, and permission controls.
- [ ] Run parallel chat sessions and switch between them without losing context.

## B) Context Control (Most Important)
- [ ] Implicit context: current file and current selection influence response.
- [ ] `#` mentions: add file, folder, symbol, codebase, changes, terminal selection.
- [ ] `@` participants: compare built-in participants such as `@terminal`, `@vscode`, `@github`.
- [ ] Drag and drop context: file, folder, and Problems item into chat.
- [ ] Context window indicator: explain token budget and why context quality matters.

## C) Prompting and Interaction Mechanics
- [ ] Prompt A/B test: vague prompt vs constrained prompt.
- [ ] While request is running: demonstrate Queue, Steer, and Stop-and-send.
- [ ] Reorder pending messages while a request is in progress.
- [ ] Edit a prior prompt and show how response changes.
- [ ] Show chat history and fork a session for an alternative path.

## D) Model and Autonomy Controls
- [ ] Model picker: compare fast model vs strong reasoning model on same task.
- [ ] Permission levels: approvals required vs higher autonomy.
- [ ] Tool approvals: manual approvals and optional auto-approve behavior.
- [ ] Explain trust boundaries: file edits, terminal commands, external tools.

## E) Built-in Tools and Tool Invocation
- [ ] Demonstrate a read tool (file/content lookup).
- [ ] Demonstrate a search tool (semantic/code/text search).
- [ ] Demonstrate an edit tool (multi-file change proposal and apply).
- [ ] Demonstrate execute tool (run terminal command and use output).
- [ ] Demonstrate web fetch tool for lightweight research in chat.
- [ ] Show `#` tool mentions and when explicit tool direction helps.

## F) Slash Commands and Power User Flows
- [ ] `/explain`, `/fix`, `/tests`, `/setupTests` on selected code.
- [ ] `/new` and `/newNotebook` as scaffolding workflows.
- [ ] `/plan` for implementation planning before edits.
- [ ] `/compact` to summarize long conversation context.
- [ ] `/search` to generate focused search patterns.
- [ ] `/init` to generate workspace instructions from project patterns.

## G) Editing, Review, and Recovery
- [ ] Apply AI edits and review inline diffs in changed files.
- [ ] Keep/Undo individual hunks from AI-generated edits.
- [ ] Show checkpoints/restore points and rollback after a risky change.
- [ ] Stage changes and explain how it affects pending AI edits.

## H) Source Control + PR Productivity
- [ ] Use current changes as chat context (`#changes` style flow).
- [ ] Generate commit message from current diff.
- [ ] Generate PR title and description from commit/changes.
- [ ] Ask `@github` questions about issues/PRs assigned to you.

## I) Testing, Debugging, and Reliability
- [ ] Generate tests from selected functions and run them.
- [ ] Use failing test context and request fix suggestions.
- [ ] Show `/startDebugging` or debug-assist flow for launch config.
- [ ] Demonstrate fix loop: diagnose, patch, rerun, verify.

## J) Customization (Critical for Teams)
- [ ] Create `.github/copilot-instructions.md` and show always-on behavior.
- [ ] Create one `*.instructions.md` with `applyTo` and prove scoped behavior.
- [ ] Show instruction priority (personal vs repo vs org) in practical terms.
- [ ] Use diagnostics/references to verify which instructions were applied.
- [ ] Demonstrate `/create-instruction` and extraction from a conversation.

## K) Agent Skills and Reusable Workflows
- [ ] Explain skills vs instructions (capability vs policy).
- [ ] Create a basic `SKILL.md` and invoke it with `/skill-name`.
- [ ] Show auto-invocable vs manual-only skill behavior.
- [ ] Demonstrate skill resources (script/template referenced by `SKILL.md`).
- [ ] Mention optional forked skill context for heavy tasks.

## L) Enterprise and Extension Story
- [ ] MCP integration concept: extend Copilot with external tools/services.
- [ ] Extension-contributed participants/tools overview.
- [ ] Organization policy controls (features/models/tools governance).
- [ ] Security posture: approvals, least privilege, and auditability mindset.

## M) Experimental/Optional Features (Time Permitting)
- [ ] Review Selection / Code Review flows in-editor or SCM view.
- [ ] Integrated browser + browser element context (if enabled).
- [ ] Chat image carousel and vision attachments.
- [ ] Semantic search in Search view and settings search AI toggle.

## Seminar-Ready Coverage Gate (Do this at the end)
- [ ] You demonstrated all items in sections A through J.
- [ ] You demonstrated at least 3 items from K through M.
- [ ] You included at least one failure-and-recovery scenario.
- [ ] You showed one governance/safety scenario for team leads.
- [ ] You ended with a one-page best-practices summary generated live by Copilot.

## Suggested Full-Day Sequence
1. Foundations: A, B, C
2. Agent power: D, E, F
3. Delivery loop: G, H, I
4. Team scale: J, K, L
5. Optional extras: M + audience challenge

## Presenter Note
If time is tight, keep all demos focused on mechanics and verification: "what I asked", "what Copilot used", "what changed", "how I validated it".

## N) Recommended File-Scoped Instructions (3 Types + Examples)
Use these as live examples for instruction files that teams commonly implement.

### 1) API and backend rules
Typical use cases:
- Enforce a standard error response shape.
- Validate request payloads before business logic.
- Require structured logging with request IDs.
- Prevent leaking internal errors to clients.

Example file: `.github/instructions/backend-api.instructions.md`

```md
---
name: Backend API conventions
description: Apply API conventions for backend routes and services
applyTo: "src/api/**/*.ts,src/server/**/*.ts"
---

- Always validate request payloads at route boundaries.
- Return errors using the shared response format.
- Use structured logs and include requestId in all error logs.
- Never expose raw stack traces in API responses.
- Keep route handlers thin; move logic to services.
```

### 2) Frontend UI and accessibility rules
Typical use cases:
- Enforce semantic HTML and accessible interactions.
- Use design tokens instead of hard-coded styles.
- Keep component responsibilities consistent.

Example file: `.github/instructions/frontend-ui.instructions.md`

```md
---
name: Frontend UI conventions
description: UI, accessibility, and styling rules for frontend code
applyTo: "src/components/**/*.{ts,tsx},src/pages/**/*.{ts,tsx},src/styles/**/*.css"
---

- Use semantic elements and meaningful ARIA labels when needed.
- Ensure keyboard navigation works for interactive components.
- Use design tokens or CSS variables instead of hard-coded colors and spacing.
- Keep components presentational when possible; move side effects to hooks/services.
- Include empty, loading, and error states for async screens.
```

### 3) Test quality and reliability rules
Typical use cases:
- Keep tests deterministic and isolated.
- Standardize test naming and structure.
- Require edge-case coverage for critical logic.

Example file: `.github/instructions/testing.instructions.md`

```md
---
name: Testing standards
description: Rules for unit and integration test quality
applyTo: "**/*.{test,spec}.{js,ts,tsx},tests/**/*.{js,ts,tsx}"
---

- Write deterministic tests: mock time, randomness, and network calls.
- Follow Arrange, Act, Assert structure with clear test names.
- Prefer behavior-focused assertions over implementation details.
- Add at least one edge-case test per public function.
- Keep tests independent; avoid shared mutable state.
```

### Demo TODOs for this section
- [ ] Create one `*.instructions.md` file and show it appears in chat references.
- [ ] Send the same prompt on matching and non-matching files to show scope behavior.
- [ ] Change the `applyTo` pattern live and show how behavior changes.
