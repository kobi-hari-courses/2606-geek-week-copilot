---
description: "Create a complete theme palette CSS file from primary/accent and light or dark mode"
name: "Create Theme"
argument-hint: "Optional output filename, for example: my-theme.css"
agent: "agent"
---
Create a CSS theme palette file with 11-step scales for primary and accent.

First, collect all required information from the user before generating any file content.

Required questions (ask these first):
1. What is the primary color? Accept hex (preferred), rgb(), hsl(), or named color.
2. What is the accent color? Accept hex (preferred), rgb(), hsl(), or named color.
3. Should this theme be light mode or dark mode?

Mode rules for base colors:
- If mode is `dark`:
  - `--background-color: #0f1a2b;`
  - `--foreground-color: #f6fbff;`
- If mode is `light`:
  - `--background-color: #f6fbff;`
  - `--foreground-color: #0f1a2b;`

After collecting answers:
1. Normalize color inputs to valid CSS color values.
2. Create variables:
   - `--primary-color`
   - `--accent-color`
   - `--background-color`
   - `--foreground-color`
3. Generate the primary scale `--p-00` to `--p-100`:
   - `--p-00` = background
   - `--p-50` = primary
   - `--p-100` = foreground
   - `--p-10..--p-40` use `color-mix(in srgb, var(--primary-color) X%, var(--background-color) Y%)`
   - `--p-60..--p-90` use `color-mix(in srgb, var(--primary-color) X%, var(--foreground-color) Y%)`
   - Ratios by step: 20/80, 40/60, 60/40, 80/20
4. Generate the accent scale `--a-00` to `--a-100` with the same structure and ratios.

Output requirements:
- Return a single `:root` CSS block only.
- Use this exact variable order:
  1. base colors (`--primary-color`, `--accent-color`, `--foreground-color`, `--background-color`)
  2. primary scale (`--p-00` ... `--p-100`)
  3. accent scale (`--a-00` ... `--a-100`)
- Do not include explanations unless the user asks.

If any required input is missing, ask only for the missing values and wait.

If the user provides an argument, treat it as the target output filename and mention it in one short confirmation line before the CSS block.