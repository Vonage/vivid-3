/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const isCI = process.env['CI'] === 'true';
const reporter = isCI
	? ['lcov', 'text']
	: ['text', 'html', 'clover', 'json', 'lcov'];

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/libs/nx-vivid',

	plugins: [nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

		reporters: ['default'],
		coverage: {
			reporter,
			reportsDirectory: '../../coverage/libs/nx-vivid',
			provider: 'v8',
		},
	},
});
