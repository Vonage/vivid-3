# Fetching and parsing

The plugin fetches all local variables and styles from the Figma file using the Figma Plugin API. It does not access libraries or external files.

## What is fetched

- **Color variables**
  - Retrieved via `figma.variables.getLocalVariablesAsync()`
- **Shadow styles**
  - Retrieved via `figma.getLocalEffectStylesAsync()`
- **Typography styles**
  - Retrieved via `figma.getLocalTextStylesAsync()`

## How each type is parsed

### Color variables

- The [figvar2dtcg](https://www.npmjs.com/package/figvar2dtcg) package is used to transform the variables to DTCG.
- Token name comes from the variable name, converted to kebab-case.
- Hex color value with alpha is taken as-is and assigned to `$value` in DTCG.
- One JSON file is created per variable mode (e.g., light, dark).

### Shadow styles

- Uses styles of type `DROP_SHADOW`.
- Each style may contain multiple shadow "stops".
- Each stop includes:
  - `offsetX`, `offsetY`, `blur`, `spread`, `color`
- These are mapped to DTCG format:
  - `x`, `y`, `blur`, `spread`, `color`

### Typography styles

- Text styles are mapped to typography tokens.
- Properties like `fontFamily`, `fontSize`, `lineHeight`, and `fontStyle` are extracted.
- Each becomes a field in the DTCG typography token object.

## Notes

- Tokens are never renamed or deduplicated.
- No fallback, no filtering — if it’s there, it’s exported.
- Plugin generates `$type` explicitly for style-based tokens and infers it for variables.

This step is deterministic and relies fully on the definitions present in the Figma file.
