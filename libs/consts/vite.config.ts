/// <reference types="vitest" />
import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/consts',

	plugins: [
		dts({
			entryRoot: 'src',
			tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
			skipDiagnostics: true,
		}),

		viteTsConfigPaths({
			root: '../../',
		}),
	],
	build: {
		outDir: '../../dist/libs/consts',
		reportCompressedSize: true,
		commonjsOptions: { transformMixedEsModules: true },
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'consts',
			fileName: 'index',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: [],
		},
		emptyOutDir: true,
	},
});
