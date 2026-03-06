import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default compat.config({
	root: true,
	extends: [
		'plugin:compat/recommended',
		'@repo/eslint-config/base.js',
		'prettier',
	],
	env: {
		browser: true,
	},
	plugins: ['@typescript-eslint', 'import', 'eslint-plugin-tsdoc'],
	rules: {
		// Inlined from @microsoft/eslint-config-fast-dna
		'no-unused-vars': 'off',
		'no-extra-boolean-cast': 'off',
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': [
			'error',
			{ allow: ['asyncMethods', 'methods'] },
		],
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/typedef': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'max-len': [
			'error',
			{
				code: 140,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
				ignoreComments: true,
			},
		],
		// 'import/order': 'error', // doesn not supported in ESLint 10
		'sort-imports': [
			'error',
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
			},
		],
		'comma-dangle': 'off',
		'@typescript-eslint/no-empty-interface': [
			'error',
			{
				allowSingleExtends: true,
			},
		],
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
				leadingUnderscore: 'allow',
			},
			{
				selector: 'property',
				format: null,
			},
			{
				selector: 'variable',
				format: null,
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: false,
				},
			},
		],
		'@typescript-eslint/no-inferrable-types': 'off',
		'no-prototype-builtins': 'off',
		'no-fallthrough': 'off',
		'no-unexpected-multiline': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				args: 'none',
				argsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
			},
		],
		'@typescript-eslint/no-empty-object-type': [
			'error',
			{
				allowInterfaces: 'with-single-extends',
				allowObjectTypes: 'always',
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',

		// Existing component-specific rules
		'@repo/repo/no-attribute-default-value': 'error',
		'compat/compat': 'error',
		'@typescript-eslint/explicit-member-accessibility': [
			'error',
			{
				accessibility: 'no-public',
			},
		],
		'@typescript-eslint/no-unsafe-declaration-merging': 'off',
	},
	overrides: [
		{
			files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
			rules: {
				'@typescript-eslint/naming-convention': 'off',
			},
		},
		{
			files: ['**/*.test.ts', '**/*.spec.ts'],
			rules: {
				'max-len': 'off',
			},
		},
		{
			files: ['**/*.d.ts'],
			rules: {
				'@typescript-eslint/no-empty-object-type': 'off',
			},
		},
		{
			files: ['**/*.js'],
			extends: ['eslint:recommended'],
			env: {
				node: true,
				'shared-node-browser': true,
			},
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
});
