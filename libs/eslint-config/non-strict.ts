import { defineConfig } from 'eslint/config';

export default defineConfig({
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	rules: {
		// Disable rules that require strict typing
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
		'@typescript-eslint/no-useless-default-assignment': 'off',
		'@typescript-eslint/no-unnecessary-condition': 'off',
	},
});
