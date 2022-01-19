module.exports = {
	extends: [
		'stylelint-config-sass-guidelines',
		'stylelint-a11y/recommended',
		'stylelint-config-idiomatic-order',
	],
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],
	rules: {
		indentation: 'tab',
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
			},
		],
		'order/properties-alphabetical-order': null,
		'selector-max-id': null,
		'selector-class-pattern': null,
		'max-nesting-depth': null,
		'selector-max-compound-selectors': null,
		'a11y/selector-pseudo-class-focus': null,
		'a11y/no-outline-none': null,
		'no-duplicate-selectors': true,
		'declaration-block-no-duplicate-properties': true,
		'function-parentheses-space-inside': null,
		'rule-empty-line-before': null,
		'a11y/media-prefers-reduced-motion': null
	},
};
