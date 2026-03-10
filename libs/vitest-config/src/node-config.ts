import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		// Vitest 4 only excludes node_modules and .git by default; restore v3-style excludes
		exclude: [
			...configDefaults.exclude,
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,stylelint,prettier,playwright,cem}.config.*',
		],
		reporters: ['default'],
		coverage: {
			include: ['src/**/*.{ts,tsx,js,jsx,mts,cts,mjs,cjs}'],
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
			reporter: ['text', 'json'],
			provider: 'v8',
			reportOnFailure: true,
		},
		passWithNoTests: true,
		fakeTimers: {
			toFake: [
				'setTimeout',
				'clearTimeout',
				'setInterval',
				'clearInterval',
				'setImmediate',
				'clearImmediate',
				'Date',
			],
		},
	},
});
