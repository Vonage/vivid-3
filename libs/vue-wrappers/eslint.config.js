import baseConfig from '@repo/eslint-config/base.js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.stories.js'],
		rules: {
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'no-mixed-spaces-and-tabs': 'off',
		},
	},
]);
