import { defineConfig, mergeConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import baseViteConfig from '@repo/vite-config/base';

export default mergeConfig(
	baseViteConfig,
	defineConfig({
		plugins: [vue(), dts() as PluginOption],

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
				cssFileName: 'style',
			},
			rolldownOptions: {
				external: ['@testing-library/user-event', '@vonage/vivid'],
			},
		},
	})
);
