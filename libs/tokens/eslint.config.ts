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
			'@typescript-eslint/restrict-plus-operands': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
		},
	},
]);
