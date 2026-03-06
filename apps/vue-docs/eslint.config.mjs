import { FlatCompat } from '@eslint/eslintrc';
import pluginVue from 'eslint-plugin-vue';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const baseConfig = compat.config({
	root: true,
	extends: ['@repo/eslint-config/base.js'],
	ignorePatterns: ['docs/.vitepress/cache'],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
});

export default [
	...pluginVue.configs['flat/recommended'],
	...baseConfig,
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				// Let vue-eslint-parser from pluginVue handle Vue SFCs,
				// but delegate script blocks to the TS parser.
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				ecmaVersion: 'latest',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'vue/multi-word-component-names': 0,
			'vue/no-multiple-template-root': 0,
			'vue/html-indent': 'off',
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{
					registeredComponentsOnly: false,
					ignores: [],
				},
			],
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'always',
						component: 'always',
					},
					svg: 'always',
					math: 'always',
				},
			],
			'vue/no-deprecated-slot-attribute': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/singleline-html-element-content-newline': 'off',
		},
	},
];
