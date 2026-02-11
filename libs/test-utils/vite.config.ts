import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [vue(), dts()],

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
});
