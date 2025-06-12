/** @type {import('stylelint').Config} */
export default {
	plugins: ['stylelint-no-unsupported-browser-features'],
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-idiomatic-order',
	],
	overrides: [
		{
			files: ['**/*.scss'],
			rules: {
				'order/properties-alphabetical-order': null,
				'selector-max-id': null,
				'selector-class-pattern': null,
				'max-nesting-depth': null,
				'selector-max-compound-selectors': null,
				'no-duplicate-selectors': null,
				'declaration-block-no-duplicate-properties': true,
				'rule-empty-line-before': null,
				'value-keyword-case': [
					'lower',
					{
						camelCaseSvgKeywords: true,
					},
				],
				'scss/operator-no-newline-after': null,
				'declaration-property-value-keyword-no-deprecated': [
					true,
					{
						ignoreKeywords: ['break-word'],
					},
				],
			},
		},
	],
};
