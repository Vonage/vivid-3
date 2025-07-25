/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import uiVitestConfig from '@repo/vitest-config/ui';
import dts from 'vite-plugin-dts';

export default mergeConfig(
	uiVitestConfig,
	defineConfig({
		plugins: [
			vue(),
			dts({
				skipDiagnostics: true,
			}),
		],

		test: {
			setupFiles: ['vitest.setup.ts'],
		},

		build: {
			lib: {
				entry: [
					'src/dom.ts',
					'src/playwright.ts',
					'src/cypress.ts',
					'src/jsdom-polyfill.ts',
				],
				name: 'vivid-test-utils',
				formats: ['es', 'cjs'],
			},
			rollupOptions: {
				external: ['@testing-library/user-event', '@vonage/vivid'],
			},
		},
	})
);
