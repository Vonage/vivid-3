import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base.js';
import pluginVue from 'eslint-plugin-vue';

export default defineConfig([
	{ ignores: ['docs/.vitepress/cache/**'] },
	...baseConfig,
	{
		settings: {
			'import/resolver': { typescript: {} },
		},
	},
	...pluginVue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
			},
		},
		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/no-multiple-template-root': 'off',
			'vue/html-indent': 'off',
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{ registeredComponentsOnly: false, ignores: [] },
			],
			'vue/html-self-closing': [
				'error',
				{
					html: { void: 'always', normal: 'always', component: 'always' },
					svg: 'always',
					math: 'always',
				},
			],
			'vue/no-deprecated-slot-attribute': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/singleline-html-element-content-newline': 'off',
		},
	},
]);
