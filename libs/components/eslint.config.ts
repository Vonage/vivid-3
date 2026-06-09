import { defineConfig } from 'eslint/config';
import repoPlugin from '@repo/eslint-plugin-repo';
import baseConfig from '@repo/eslint-config/base';

export default defineConfig([
	...baseConfig,
	{
		files: ['**/*.ts'],
		plugins: {
			'@repo/repo': repoPlugin,
		},
		rules: {
			// Enable our custom rules for components
			'@repo/repo/no-attribute-default-value': 'error',
			'@repo/repo/underscore-member-requires-internal': 'error',

			// Disable for now (120 cases):
			'@typescript-eslint/no-unnecessary-condition': 'off',
		},
	},
]);
