# Dev Geek Week 2026 - Copilot Seminar

This repository captures the practical conference session we ran in VS Code with GitHub Copilot.

## What We Demonstrated In The Agent Window

- Prompt writing patterns for better task outcomes.
- Session management in chat:
  - Starting and switching sessions for different tasks.
  - Using restore points to roll back and compare approaches.
  - Branching a session to explore alternatives without losing the original path.
- Model selection and when to switch between faster and deeper-reasoning models.
- Agent selection and choosing the right mode for the task.
- Approval modes and automatic approvals:
  - Manual approval flow for safety-sensitive actions.
  - Auto-approve flow for fast iteration in trusted scopes.
- Context management:
  - Current file and selected lines in context.
  - Adding files with drag-and-drop.
  - Adding files and folders with # references.
- Asynchronous prompting and steering while a request is running.

## Customizations We Created In This Repository

### Instructions

- .github/instructions/css-nesting.instructions.md
  - Scope: all CSS files.
  - Purpose: enforce native CSS nesting that mirrors HTML hierarchy.
  - Guidance includes depth limits, specificity control, and practical nesting patterns.

### Prompt

- .github/prompts/create-theme.prompt.md
  - A reusable prompt workflow to generate a full theme palette from:
    - primary color
    - accent color
    - light or dark mode
  - Produces a single :root block with base tokens and full --p-00..--p-100 / --a-00..--a-100 scales.

### Custom Agent

- .github/agents/instructor.agent.md
  - User-invocable Instructor agent for step-by-step teaching.
  - Focuses on short, verifiable steps and strict validation before moving forward.
  - Enforces project rules for CSS nesting and palette-token-only color usage.

### Skills

- .github/skills/theme-palette-css-enforcer/SKILL.md
  - Enforces a hard rule: no literal CSS colors.
  - Requires palette-based color usage only (primary/accent scales and base theme variables).
  - Adds shade-selection logic and completion checks for consistent theming.

- .github/skills/css-design-tokens-custom-properties/SKILL.md
  - Defines a 3-layer design token model:
    - universal tokens (--p-*, --a-*)
    - global semantic tokens (--gs-*)
    - component-scoped tokens (--cs-*)
  - Covers migration strategy, fallback chains, scoped overrides, and anti-patterns.

## Viable Working System We Discussed

The team workflow we discussed is:

1. Explore in sessions
   - Use chat sessions to prototype, test ideas, and compare approaches quickly.

2. Capture stable knowledge
   - When a pattern repeats and proves useful, extract it from the session.

3. Codify into repo customizations
   - Policy and guardrails go to instructions.
   - Reusable procedures go to skills.
   - Reusable one-shot generators go to prompts.
   - Teaching or specialized execution style goes to custom agents.

4. Validate in a fresh session
   - Re-run typical tasks and verify the new customization is invoked and effective.

5. Version and evolve
   - Commit changes, collect team feedback, and refine over time.

## MCP Servers, Image Generation, And Integrated Browser

We covered practical MCP usage as an extension path for Copilot tools, including image generation scenarios.

Example MCP server from our discussion:

- imagegen server via npx
- model example: gpt-image-1

High-level setup flow:

1. Install Node.js 18+.
2. Add the MCP server configuration in VS Code settings.
3. Provide OPENAI_API_KEY.
4. Restart VS Code and verify tools are available in chat.
5. Use image generation tools from agent flows when visual assets are needed.

We also demonstrated the integrated browser for agent-driven web tasks, including:

- opening pages in the built-in browser surface
- interacting with page elements
- keeping browser actions inside the same agent workflow for tighter iteration
