import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/docs',

	plugins: [nxViteTsPaths()],

	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },

	test: {
		coverage: {
			provider: 'istanbul'
		},
		globals: true,
		cache: { dir: '../../node_modules/.vitest' },
		environment: 'jsdom',
		include: ['apps/docs/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx, mjs}'],
	},
});
