# DTCG output

The plugin generates token files in strict accordance with the [Design Tokens Community Group (DTCG) format](https://tr.designtokens.org/format/). The structure is compliant and ready to consume by downstream tooling.

## Output structure

- For each variable mode (e.g., light, dark), a separate DTCG-compliant JSON file is generated.
- Files contain one or more token categories depending on the styles and variables present:
  - `color`
  - `shadow`
  - `typography`

## Token format

Each token includes:

- `$value`: the value extracted from Figma (hex, object, etc.)
- `$type`: type of token (e.g., `color`, `shadow`, `typography`)
- Optional additional metadata, if needed in the future

### Example: color token

```json
{
	"color-primary": {
		"$value": "#0066ff80",
		"$type": "color"
	}
}
```

### Example: shadow token

```json
{
	"elevate-level-1": {
		"$type": "shadow",
		"$value": [
			{
				"x": 0,
				"y": 2,
				"blur": 4,
				"spread": 0,
				"color": "#00000033"
			}
		]
	}
}
```

### Example: typography token

```json
{
	"heading-large": {
		"$type": "typography",
		"$value": {
			"fontFamily": "Inter",
			"fontSize": 32,
			"lineHeight": 40,
			"fontStyle": "normal"
		}
	}
}
```

## Key principles

- Output is shaped by Figma content — no artificial grouping or remapping.
- Token keys are kebab-case names derived from Figma.
- The plugin doesn’t guess, enrich, or modify token data beyond format conversion.

The goal is to have clean, predictable, DTCG-valid JSON — ready for GitHub and further automation.
