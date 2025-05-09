# eslint-plugin

Most projects already use ESLint to enforce code quality and style. The Vivid ESLint plugin extends ESLint to catch issues specific to Vivid projects.

## Installation

```bash
npm install --save-dev @vonage/eslint-plugin-vivid
```

## Usage

Add `@vonage/vivid/vue` to the plugins section of your `.eslintrc` configuration file:

```json
{
	// ...
	"extends": [
		// ...
		"plugin:@vonage/vivid/vue"
	]
}
```

Then configure the rules you want to use under the rules section:

```json
{
	"rules": {
		"@vonage/vivid/no-deprecated-apis": "error",
		"@vonage/vivid/accessible-names": "error",
		"@vonage/vivid/no-inaccessible-events": "error",
		"@vonage/vivid/no-anchor-attribute": "error",
		"@vonage/vivid/no-slot-attribute": "error",
		"@vonage/vivid/no-value-attribute": "error",
		"@vonage/vivid/no-current-value-attribute": "error",
		"@vonage/vivid/no-idref-aria-attribute": "error"
	}
}
```

## Building

Run `nx build eslint-plugin` to build the library.

## Running unit tests

Run `nx test eslint-plugin` to execute the unit tests via [vitest](https://vitest.dev).

## Development tools

Use [astexplorer](https://astexplorer.net/) with parser `vue-eslint-parser` to explore the AST of the code you want to lint.

## Rules

### no-deprecated-apis

This rule disallows the use of deprecated APIs in Vivid components.

### accessible-names

This rule ensures that all interactive elements have accessible names.

### no-inaccessible-events

This rule disallows the use of inaccessible events in Vivid components.

### no-anchor-attribute

This rule disallows the use of the `anchor` attribute in Vivid components.

### no-slot-attribute

This rule disallows the use of the `slot` attribute in Vivid components.

### no-value-attribute

This rule disallows the use of the `value` attribute in Vivid components.

### no-current-value-attribute

This rule disallows the use of the `current-value` attribute in Vivid components.

### no-idref-aria-attribute

This rule disallows the use of IDREF ARIA attributes (like `aria-labelledby`, `aria-describedby`, etc.) on components that delegate ARIA attributes, as they will not work correctly.
