/// <reference types="vitest" />
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'path';

const isCI = process.env['CI'] === 'true';

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

		reporters: ['default'],
		coverage: {
			reporter: isCI
				? ['text']
				: ['text', 'html', 'clover', 'json', 'lcov'],
			reportsDirectory: '../../coverage/libs/wrapper-gen',
			provider: 'v8',
		},
	},
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
