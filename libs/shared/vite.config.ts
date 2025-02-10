/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const isCI = process.env['CI'] === 'true';
const reporter = isCI ? ['text'] : ['text', 'html', 'clover', 'json', 'lcov'];

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.spec.ts'],
		reporters: ['default'],
		coverage: {
			reportsDirectory: '../../coverage/libs/components',
			provider: 'v8',
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.spec.ts', 'src/**/*test*.ts', 'src/locales/**.*'],
			reporter,
		},
		pool: 'threads',
		poolOptions: {
			useAtomics: true,
		},
	},
	root: __dirname,
	cacheDir: '../../node_modules/.vite/libs/shared',

	plugins: [nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },
});
