import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

const isCI = process.env['CI'] === 'true';
const reporter = isCI
	? ['lcov', 'text']
	: ['text', 'html', 'clover', 'json', 'lcov'];

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

		reporters: ['default'],
		coverage: {
			reporter,
			reportsDirectory: '../../coverage/libs/eslint-plugin',
			provider: 'v8',
		},
	},
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
