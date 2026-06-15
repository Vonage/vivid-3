import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base';

export default defineConfig([
	...baseConfig,
	{ ignores: ['**/*.generated.ts'] },
	{
		files: ['**/*.ts'],
		rules: {
			// Allow existing patterns
			'@typescript-eslint/no-unnecessary-type-conversion': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'@typescript-eslint/no-invalid-void-type': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
		},
	},
]);
