import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import compatPlugin from 'eslint-plugin-compat';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import repoPlugin from '@repo/eslint-plugin-repo';
import importPlugin from 'eslint-plugin-import';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import baseConfig from '@repo/eslint-config/base.js';

export default defineConfig([
	...baseConfig,
	compatPlugin.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: globals.browser,
		},
		plugins: {
			'@repo/repo': repoPlugin,
			import: importPlugin,
			tsdoc: tsdocPlugin,
		},
		rules: {
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
			'sort-imports': [
				'error',
				{ ignoreCase: true, ignoreDeclarationSort: true },
			],
			'comma-dangle': 'off',
			'@typescript-eslint/no-empty-interface': [
				'error',
				{ allowSingleExtends: true },
			],
			'@typescript-eslint/camelcase': 'off',
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
			'@repo/repo/no-attribute-default-value': 'error',
			'@repo/repo/underscore-member-requires-internal': 'error',
			'compat/compat': 'error',
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{ accessibility: 'no-public' },
			],
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
		},
	},
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		rules: { '@typescript-eslint/naming-convention': 'off' },
	},
	{
		files: ['**/*.test.ts', '**/*.spec.ts'],
		rules: { 'max-len': 'off' },
	},
	{
		files: ['**/*.d.ts'],
		rules: { '@typescript-eslint/no-empty-object-type': 'off' },
	},
	{
		files: ['**/*.js'],
		...js.configs.recommended,
		languageOptions: {
			globals: { ...globals.node, ...globals['shared-node-browser'] },
		},
		rules: { '@typescript-eslint/no-var-requires': 'off' },
	},
]);
