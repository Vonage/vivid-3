import { defineConfig } from 'vitest/config';

const isCI = process.env['CI'] === 'true';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['default'],
		coverage: {
			exclude: [
				'**/coverage/**',
				'**/dist/**',
				'**/node_modules/**',
				'**/[.]**',
				'**/*.d.ts',
				'**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
				'**/__tests__/**',
				'**/__fixtures__/**',
				'**/__mocks__/**',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,stylelint,prettier,playwright,cem}.config.*',
				'**/vitest.{workspace,projects}.[jt]s?(on)',
				'**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
			],
			allowExternal: true, // This will collect coverage from other packages in the monorepo. For built packages, source maps are required for this to work
			reporter: isCI ? ['json'] : ['text', 'html', 'json'],
			provider: 'v8',
		},
		passWithNoTests: true,
	},
});
