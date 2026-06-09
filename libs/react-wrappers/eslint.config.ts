import { defineConfig } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import baseConfig from '@repo/eslint-config/base';
import globals from 'globals';

export default defineConfig([
	{
		ignores: [
			'dist/**',
			'temp/**',
			'types/**',
			'v3/**',
			'stories/**',
			'.storybook/**',
		],
	},
	...baseConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			// Allow existing patterns
			'no-console': 'off',
			'no-redeclare': 'off',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
		},
	},
	...(storybook.configs['flat/recommended'] as any),
]);
