/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/eslint-plugin',

	plugins: [
		nxViteTsPaths(),
		dts({
			entryRoot: 'src',
			tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
			skipDiagnostics: true,
		}),
	],

	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'eslint-plugin',
			fileName: 'index',
			formats: ['es', 'cjs'],
		},
		target: 'esnext',
		rollupOptions: {
			external: ['eslint-plugin-vue/lib/utils/index.js'],
		},
	},
});
