import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base.js';

export default defineConfig([
	...baseConfig,
	{
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
]);
