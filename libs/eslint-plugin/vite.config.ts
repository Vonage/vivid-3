/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import baseVitestConfig from '@repo/vitest-config/base';

export default mergeConfig(
	baseVitestConfig,
	defineConfig({
		plugins: [
			dts({
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
	})
);
