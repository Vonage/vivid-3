/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const isCI = process.env['CI'] === 'true';
const reporter = isCI ? ['text'] : ['text', 'html', 'clover', 'json', 'lcov'];

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/apps/docs',

	plugins: [nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	test: {
		setupFiles: ['vitest.setup.ts'],
		passWithNoTests: true,
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['**/*.spec.ts'],
		reporters: ['default'],
		coverage: {
			reporter,
			reportsDirectory: '../../coverage/apps/docs',
			provider: 'v8',
		},
	},
});
