import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			skipDiagnostics: true,
		}),
	],

	build: {
		lib: {
			entry: ['src/jsdom-config.ts', 'src/node-config.ts'],
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['vitest/config'],
		},
	},
});
