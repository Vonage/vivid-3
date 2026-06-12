import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { vividAiPlugin } from './src/server/ai-plugin';

export default defineConfig({
	clearScreen: false,
	plugins: [vividAiPlugin()],
	server: {
		port: 5199,
	},
	resolve: {
		alias: {
			'virtual:vivid-metadata': resolve(
				import.meta.dirname,
				'../../libs/components/metadata.json'
			),
		},
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(import.meta.dirname, 'index.html'),
				preview: resolve(import.meta.dirname, 'preview.html'),
			},
		},
	},
});
