/// <reference types='vitest' />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const isCI = process.env['CI'] === 'true';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/libs/wrapper-gen',

	plugins: [nxViteTsPaths()],

	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	define: {
		__PACKAGE_VERSION__: JSON.stringify('0.0.0'),
	},

	test: {
		watch: false,
		globals: true,
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

		reporters: ['default'],
		coverage: {
			reporter: isCI ? ['text'] : ['text', 'html', 'clover', 'json', 'lcov'],
			reportsDirectory: '../../coverage/libs/wrapper-gen',
			provider: 'v8',
		},
	},
});
