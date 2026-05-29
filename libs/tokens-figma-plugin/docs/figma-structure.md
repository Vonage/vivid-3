# Figma structure

Figma is the single source of truth for design tokens. The plugin doesn’t modify, validate, or interpret the data — it just reads and exports it. That means the structure, naming, and correctness of the tokens are fully owned by the design team.

## Naming conventions

- Token names are taken directly from Figma variable and style names.
- Names are converted to **kebab-case** before being used as DTCG token keys.
  - Example: `Elevate/Level 1` → `elevate-level-1`
- Grouping styles and variables in Figma affects the name of the token, since the name is based on full path to the value.

## Supported token sources

- **Color tokens**: Figma variables of color type
- **Shadow tokens**: Figma effect styles using `DROP_SHADOW`
- **Typography tokens**: Figma text styles

## Unsupported tokens

- Any variable that isn’t a color (e.g., number, boolean, gradient) is ignored.
- Any style type other than text or drop shadow is skipped.

## Responsibility model

- The plugin will export what it sees. If there’s a typo in Figma, it becomes a typo in code.
- No filtering or whitelisting is supported. Everything local to the file is included.

In short: what you define in Figma is exactly what will land in the codebase.
