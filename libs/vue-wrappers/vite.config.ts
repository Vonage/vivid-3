/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/vue-wrappers',

	plugins: [
		nxViteTsPaths(),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		dedupe: ['vue'],
	},

	optimizeDeps: {
		exclude: ['vue', '@vonage/vivid'],
	},

	build: {
		lib: {
			name: 'vivid-vue',
			entry: 'src/index.ts',
			fileName: format => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['vue', '@vonage/vivid'],
			output: {
				globals: {
					vue: 'Vue',
					'@vonage/vivid': 'Vivid',
				},
				inlineDynamicImports: true,
			},
		},
	},
});
