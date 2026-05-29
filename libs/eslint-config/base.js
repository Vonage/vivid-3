import { defineConfig } from 'eslint/config';
import banPlugin from 'eslint-plugin-ban';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const banRules = [
	{ name: ['describe', 'only'], message: "don't focus tests" },
	{ name: 'fdescribe', message: "don't focus tests" },
	{ name: ['it', 'only'], message: "don't focus tests" },
	{ name: 'fit', message: "don't focus tests" },
	{ name: ['test', 'only'], message: "don't focus tests" },
	{ name: 'ftest', message: "don't focus tests" },
];

export default defineConfig([
	{
		ignores: ['dist', 'node_modules', 'coverage', 'tmp'],
	},
	...tsPlugin.configs['flat/recommended'],
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			ban: banPlugin,
			import: importPlugin,
			'unused-imports': unusedImportsPlugin,
		},
		rules: {
			'no-console': 2,
			'unused-imports/no-unused-imports': 'error',
			'no-var': 'error',
			'prefer-const': 'error',
			'import/prefer-default-export': 'off',
			'class-methods-use-this': 'off',
			'no-new': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ disallowTypeAnnotations: false },
			],
			'@typescript-eslint/no-import-type-side-effects': 'error',
		},
	},
	{
		files: ['**/*.spec.ts', '**/ui.test.ts'],
		plugins: { ban: banPlugin },
		rules: {
			'ban/ban': [2, ...banRules],
		},
	},
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
	},
]);
