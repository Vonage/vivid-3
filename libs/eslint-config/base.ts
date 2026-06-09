import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';
import compat from 'eslint-plugin-compat';
// @ts-ignore
import banPlugin from 'eslint-plugin-ban';

export default defineConfig(
	{
		ignores: ['dist', 'node_modules', 'coverage', 'tmp', '**/__fixtures__/**'],
	},
	{
		files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
		extends: [
			js.configs.recommended,
			tseslint.configs.strictTypeChecked,
			importPlugin.flatConfigs.typescript,
			compat.configs['flat/recommended'],
		],
		plugins: {
			'unused-imports': unusedImportsPlugin,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			'no-console': 'error',
			'no-var': 'error',
			'prefer-const': 'error',
			'no-new': 'error',
			'sort-imports': [
				'error',
				{ ignoreCase: true, ignoreDeclarationSort: true },
			],

			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'default',
					format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
					leadingUnderscore: 'allow',
				},
				{ selector: 'property', format: null },
				{ selector: 'variable', format: null },
				{
					selector: 'interface',
					format: ['PascalCase'],
					custom: { regex: '^I[A-Z]', match: false },
				},
			],

			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{ accessibility: 'no-public' },
			],

			// Use unused-import plugin which replaces no-unused vars
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			// Allow unused vars if prefixed by _
			'unused-imports/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],

			// Allow non-null assertions
			'@typescript-eslint/no-non-null-assertion': 'off',

			// Allow explicit any and usage of it
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-type-assertion': 'off',

			// Allow async functions to not use the await keyword
			'@typescript-eslint/require-await': 'off',

			// Allow technically redundant type constituents for documentation purposes, e.g. `DateStr | ''`
			'@typescript-eslint/no-duplicate-type-constituents': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',

			'@typescript-eslint/no-confusing-void-expression': [
				'error',
				{
					ignoreArrowShorthand: true, // allow `() => returnsVoid()`
				},
			],

			// Allow using booleans and numbers in template expressions
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowBoolean: true,
					allowNumber: true,
				},
			],

			// Allow using our own deprecated features
			'@typescript-eslint/no-deprecated': 'off',

			// Allow for patterns used by us
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{
					allowInterfaces: 'with-single-extends',
					allowObjectTypes: 'always',
				},
			],
			'@typescript-eslint/no-unsafe-enum-comparison': 'off',
			'@typescript-eslint/no-dynamic-delete': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',

			// It would be useful to enable, but is used a lot
			'@typescript-eslint/unbound-method': 'off',
		},
	},
	{
		files: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.tsx', '**/*.test.tsx'],
		plugins: { ban: banPlugin },
		rules: {
			'ban/ban': [
				'error',
				// Catch accidentally committing focussed tests
				{ name: ['describe', 'only'], message: "don't focus tests" },
				{ name: 'fdescribe', message: "don't focus tests" },
				{ name: ['it', 'only'], message: "don't focus tests" },
				{ name: 'fit', message: "don't focus tests" },
				{ name: ['test', 'only'], message: "don't focus tests" },
				{ name: 'ftest', message: "don't focus tests" },
			],
		},
	},
	prettierConfig
);
