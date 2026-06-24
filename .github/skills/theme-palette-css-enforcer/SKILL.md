---
name: theme-palette-css-enforcer
description: 'Enforce theme-palette-only CSS colors and choose shades by lightness/darkness using --p-00..--p-100 and --a-00..--a-100. Use when creating, updating, reviewing, or refactoring CSS so no hard-coded colors appear.'
argument-hint: 'Optional: target CSS file(s) and intent, e.g. "buttons and cards"'
user-invocable: true
---

# Theme Palette CSS Enforcer

## Purpose
Ensure every color in CSS is selected from the theme palette variables.

Hard rule: it is absolutely forbidden to put hard-coded colors in CSS.
All colors must be picked from theme palette entries.

## When to Use
- Writing new CSS rules.
- Refactoring old CSS files that contain color literals.
- Reviewing pull requests for color consistency.
- Converting component-level styles to theme-based styles.

## Allowed Color Sources
- `var(--primary-color)` and `var(--accent-color)`
- `var(--foreground-color)` and `var(--background-color)`
- Primary scale: `var(--p-00)` through `var(--p-100)`
- Accent scale: `var(--a-00)` through `var(--a-100)`

## Forbidden Color Sources
- Hex values like `#fff`, `#1a73e8`
- `rgb()`, `rgba()`, `hsl()`, `hsla()` color literals
- Named colors like `white`, `black`, `red`
- Inline gradients containing literal colors
- Box-shadow, border, outline, text-decoration, SVG fill/stroke colors defined with literals

## Narrow Exceptions
- `transparent`
- `currentColor`
- `inherit`

No other exceptions are allowed.

## Shade Selection Logic
Pick the closest palette step by required perceived lightness.

### Primary scale (`--p-00` to `--p-100`)
- Very light surfaces: `--p-00`, `--p-10`
- Light UI chrome: `--p-20`, `--p-30`
- Mid-tone brand color: `--p-40`, `--p-50`
- Dark emphasis: `--p-60`, `--p-70`
- Very dark emphasis/text-adjacent: `--p-80`, `--p-90`, `--p-100`

### Accent scale (`--a-00` to `--a-100`)
- Subtle accent backgrounds: `--a-10` to `--a-30`
- Interactive accent defaults: `--a-40` to `--a-60`
- Strong accent emphasis: `--a-70` to `--a-100`

## Workflow
1. Inspect target CSS for any color-bearing properties.
2. Replace each hard-coded color with the nearest palette variable by lightness/darkness intent.
3. Prefer primary scale for structural UI and text hierarchy.
4. Prefer accent scale for calls to action, highlights, and semantic emphasis.
5. Verify states (hover, focus, active, disabled) are also palette-only.
6. Re-scan file and confirm there are zero literal color tokens.

## Decision Points
- If a color is neutral or layout-structural, choose from primary scale.
- If a color is attention-grabbing or semantic emphasis, choose from accent scale.
- Accent scale is restricted to emphasis use only (CTAs, highlights, semantic emphasis).
- If two adjacent shades both fit, choose the one with better contrast against its background.
- If requested intensity falls between two steps, pick the closer step; do not synthesize new literal colors.

## Completion Checks
- No `#`, `rgb`, `hsl`, or named color literals remain in CSS.
- Every color-bearing property references `var(--...)` from the theme palette.
- Any non-`var(--...)` color token must be exactly one of: `transparent`, `currentColor`, `inherit`.
- Contrast is preserved for readable text and interactive affordances.
- Theme consistency is preserved across components and states.

## Output Expectations For The AI
- Always explain replacements in terms of palette entries and shade intent.
- Always choose the best-fit step from `--p-00` to `--p-100` (or `--a-00` to `--a-100`) based on required lightness/darkness.
- Never introduce hard-coded colors under any circumstance.
