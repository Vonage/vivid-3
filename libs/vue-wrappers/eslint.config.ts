import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.ts'],
		rules: {
			// Allow existing patterns
			'@typescript-eslint/naming-convention': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
		},
	},
	{
		files: ['**/generated/**/*.ts'],
		rules: {
			'unused-imports/no-unused-vars': 'off',
			'no-sparse-arrays': 'off',
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
		},
	},
]);
