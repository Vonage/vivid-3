/// <reference types="vitest" />
import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
	cacheDir: '../../../node_modules/.vite/vue-docs',

	resolve: {
		alias: {
			'@vonage/vivid': path.resolve(__dirname, '../../../dist/libs/components/index.js'),
			'@vonage/vivid-vue': path.resolve(__dirname, '../../../dist/libs/vue-wrappers/index.js'),
		},
	},

	server: {
		fs: {
			allow: ['../../..']
		}
	}
});
