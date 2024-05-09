/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';

export default defineConfig({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/vue-wrappers',

	plugins: [nxViteTsPaths()],

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
		outDir: '../../dist/libs/vue-wrappers',
		reportCompressedSize: true,
		commonjsOptions: { transformMixedEsModules: true },
		lib: {
			entry: 'src/index.ts',
			name: 'vivid-vue',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		minify: false,
		target: 'esnext',
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
