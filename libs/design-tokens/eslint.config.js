import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base.js';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
		},
	},
]);
