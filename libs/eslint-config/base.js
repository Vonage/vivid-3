module.exports = {
	plugins: ['@repo/repo', 'ban', 'unused-imports', '@typescript-eslint'],
	ignorePatterns: ['dist', 'node_modules', 'coverage', 'tmp'],
	overrides: [
		{
			files: ['*.spec.ts', 'ui.test.ts'],
			rules: {
				'ban/ban': [
					2,
					{
						name: ['describe', 'only'],
						message: "don't focus tests",
					},
					{
						name: 'fdescribe',
						message: "don't focus tests",
					},
					{
						name: ['it', 'only'],
						message: "don't focus tests",
					},
					{
						name: 'fit',
						message: "don't focus tests",
					},
					{
						name: ['test', 'only'],
						message: "don't focus tests",
					},
					{
						name: 'ftest',
						message: "don't focus tests",
					},
				],
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'no-console': 2,
				'unused-imports/no-unused-imports': 'error',
				'no-var': 'error',
				'prefer-const': 'error',
				'import/prefer-default-export': 'off',
				'class-methods-use-this': 'off',
				'no-new': 'warn',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
			},
		},
		{
			files: ['*.js', '*.jsx'],
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			rules: {},
		},
	],
};
