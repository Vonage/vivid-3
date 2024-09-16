---
title: ESLint Plugin
order: 4
---

# ESLint Plugin

The ESLint plugin provides rules for building and maintaining projects with Vivid. At the moment, only code written with **Vivid Vue** is supported.

## About

Most projects already use ESLint to enforce code quality and style. The Vivid ESLint plugin extends ESLint to catch issues specific to Vivid projects.

The plugin can help to:

- Catch issues like accessibility violations.
- Guide towards best practices and correct usage.
- Detect use of deprecated APIs and provide automated fixes.

## Getting Started (Vue)

### Prerequisites

The plugin is intended to be used in addition to the popular [eslint-plugin-vue](https://eslint.vuejs.org/).

Follow the [eslint-plugin-vue installation instructions](https://eslint.vuejs.org/user-guide/#installation) to install the plugin and set up your environment, if you haven't already.

### Installation

Add the NPM package to your repository:

{% packageInstallation "@vonage/eslint-plugin-vivid" true %}

Use the `vue` preset by adding the following configuration to your `.eslintrc` file:

```diff
{
	// ...
	"extends": [
		// ...
+		"plugin:@vonage/vivid/vue"
	]
}
```

### Customizing Rules

The plugin provides a set of rules that can be extended or overridden. To customize the rules, add them to the `rules` key of your `.eslintrc` file:

```diff
{
	// ...
	"rules": {
+		"@vonage/vivid/no-deprecated-apis": "warn"
	}
}
```

## Rules

{% for rule in eslintRules %}

### {{ rule.name }}

{% renderFile rule.markdown %}

{% endfor %}
