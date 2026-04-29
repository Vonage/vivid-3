// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { defineConfig } from 'eslint/config';
import baseConfig from '@repo/eslint-config/base.js';

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
		files: ['**/*.js', '**/*.jsx'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
		},
	},
	...storybook.configs['flat/recommended'],
]);
