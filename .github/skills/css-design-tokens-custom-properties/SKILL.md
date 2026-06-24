---
name: css-design-tokens-custom-properties
description: 'Design tokens with CSS custom properties for token-driven CSS migration and review. Use when creating, updating, reviewing, or refactoring stylesheets to replace hard-coded values with a 3-layer token model: universal palette tokens (--p-00..--p-100, --a-00..--a-100), global semantic tokens (--gs-*), and component-scoped tokens (--cs-*); apply var() fallbacks, scoped overrides, and theme-safe token reassignment patterns.'
argument-hint: 'Optional: target CSS files and intent, for example "migrate card and button styles to gs/cs tokens"'
user-invocable: true
---

# CSS Design Tokens With Custom Properties

This skill is intentionally limited to design tokens and CSS custom properties from the CSS best-practice set:
- Use design tokens with CSS custom properties.
- Do not expand into other features unless explicitly requested.

## When to use

Use this skill when the task includes any of these signals:
- "design tokens"
- "CSS custom properties"
- "replace hard-coded colors"
- "token naming"
- "theme tokens"
- "var() fallback"
- "migrate before/after CSS"
- "global vs local tokens"

## Outcome

Produce CSS that uses a strict 3-layer token model:
1. Universal tokens: `--p-*`, `--a-*`
2. Global semantic tokens: `--gs-*`
3. Component-scoped semantic tokens: `--cs-*`

## Strict naming conventions

### 1) Universal tokens (raw scale)
- Primary: `--p-00` through `--p-100`
- Accent: `--a-00` through `--a-100`
- Meaning: intensity only, no usage semantics.

### 2) Global semantic tokens (shared meaning)
- Prefix: `--gs-`
- Pattern: `--gs-{category}-{role}`
- Examples: `--gs-text-muted`, `--gs-surface-card`, `--gs-border-soft`

### 3) Component-scoped semantic tokens (component-only)
- Prefix: `--cs-`
- Pattern: `--cs-{component}-{role}`
- Examples: `--cs-card-title`, `--cs-btn-primary-bg`, `--cs-notice-border`

## Procedure

1. Audit
- Find all hard-coded color values and repeated spacing/radius values.
- Find duplicated per-component token blocks that can be centralized.

2. Map to universal palette
- Map each literal color intent to nearest `--p-*` or `--a-*` shade.
- Do not create new literal colors during migration.

3. Create global semantic layer
- Define app-wide reusable intent tokens under `:root` with `--gs-*`.
- Keep names semantic, not value-based.

4. Add component-scoped layer
- On each component root, map local roles to `--cs-*` tokens.
- Default each `--cs-*` to `--gs-*` where possible.

5. Replace direct values
- Replace declarations with `var(--cs-...)` or `var(--gs-...)`.
- Keep token usage readable and stable.

6. Add fallback chains for safe migration
- Use nested `var()` where migration is partial.
- Preferred shape: `var(--cs-x, var(--gs-x, var(--p-..)))`.

7. Scope overrides instead of renaming tokens
- For themes/containers/variants, override token values in scope.
- Do not invent one-off suffix names like `--token-sidebar-alt-v2`.

8. Validate
- Confirm no color literals remain.
- Confirm naming conventions are followed.
- Confirm hover/active/focus states are tokenized.

## Decision points

1. Should this be `--gs-*` or `--cs-*`?
- Use `--gs-*` if multiple components share the intent.
- Use `--cs-*` if intent is specific to one component.

2. Should component CSS read `--p-*` directly?
- Usually no.
- Use `--p-*` and `--a-*` as source values for `--gs-*`.
- Allow direct use only when demonstrating raw palette mapping.

3. When to add fallback chains?
- Add fallbacks when migrating incrementally or integrating legacy CSS.
- Remove unnecessary fallback depth after migration stabilizes.

## Completion checks

- No hard-coded colors: no `#`, `rgb()`, `hsl()`, or named color literals.
- Universal tokens remain raw and semantic-free.
- Shared semantics are `--gs-*`.
- Component semantics are `--cs-*` and scoped correctly.
- Theme or container overrides happen by token reassignment, not selector duplication.
- CSS nesting remains shallow and readable.

## Real examples from this workspace

### Example A: Basic component migration
Reference: `../../../01-design-tokens-custom-properties/01-simple-card.after.css`

```css
:root {
  --gs-surface-card: var(--p-100);
  --gs-text-main: var(--p-10);
  --gs-action-bg: var(--a-50);
}

.card {
  --cs-card-surface: var(--gs-surface-card);
  --cs-card-text: var(--gs-text-main);

  background: var(--cs-card-surface);
  color: var(--cs-card-text);
}
```

### Example B: Duplication reduction
Reference: `../../../01-design-tokens-custom-properties/02-component-duplication.after.css`

```css
.card {
  --cs-card-chip-bg: var(--gs-chip-bg);
}

.profile-card {
  --cs-card-chip-bg: var(--a-80);
}
```

### Example C: Fallback chain migration
Reference: `../../../01-design-tokens-custom-properties/04-fallbacks-and-scope.after.css`

```css
.notice {
  background: var(--cs-notice-bg, var(--gs-notice-bg, var(--a-90)));
}
```

## Additional scenario examples

### Scenario 1: Status badge variants

```css
:root {
  --gs-badge-bg: var(--p-90);
  --gs-badge-text: var(--p-20);
  --gs-badge-success-bg: var(--a-80);
}

.badge {
  --cs-badge-bg: var(--gs-badge-bg);
  --cs-badge-text: var(--gs-badge-text);

  background: var(--cs-badge-bg);
  color: var(--cs-badge-text);

  &.is-success {
    --cs-badge-bg: var(--gs-badge-success-bg);
  }
}
```

Reasoning:
- Shared defaults stay global.
- Variant behavior is a scoped `--cs-*` override, not duplicated declaration blocks.

### Scenario 2: Third-party widget wrapper migration

```css
:root {
  --gs-widget-border: var(--p-30);
  --gs-widget-surface: var(--p-100);
}

.vendor-widget-shell {
  --cs-widget-border: var(--gs-widget-border, var(--p-30));
  --cs-widget-surface: var(--gs-widget-surface, var(--p-100));

  border-color: var(--cs-widget-border);
  background: var(--cs-widget-surface);
}
```

Reasoning:
- Fallbacks make migration resilient when host app tokens are missing.
- Wrapper isolates vendor CSS and keeps token logic consistent.

### Scenario 3: Container-specific theme override

```css
:root {
  --gs-panel-bg: var(--p-100);
  --gs-panel-text: var(--p-10);
}

.marketing-hero {
  --gs-panel-bg: var(--p-10);
  --gs-panel-text: var(--p-100);
}

.panel {
  --cs-panel-bg: var(--gs-panel-bg);
  --cs-panel-text: var(--gs-panel-text);

  background: var(--cs-panel-bg);
  color: var(--cs-panel-text);
}
```

Reasoning:
- One panel component adapts to different containers through scoped token reassignment.
- No duplicated selectors for each environment.

## Anti-patterns to block

- Defining component-specific tokens in `:root` when they are not shared.
- Using global semantic tokens for one-off component internals.
- Creating value-encoded names like `--gs-gray-400`.
- Mixing literal colors into hover/focus/disabled states.

## Suggested prompts

- "Migrate this CSS file to Feature 1 token model with --gs and --cs naming."
- "Review this stylesheet for token naming violations and fix them."
- "Convert duplicated component tokens into shared global semantic tokens."
- "Add safe var() fallback chains for an incremental token migration."
