import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base';
import nonStrictConfig from '@repo/eslint-config/non-strict';

export default defineConfig([
	...baseConfig,
	...nonStrictConfig,
	{
		files: ['**/*.ts'],
		rules: {
			// Allow existing patterns
			'@typescript-eslint/naming-convention': 'off',
		},
	},
]);
