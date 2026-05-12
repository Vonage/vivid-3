import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
	plugins: [viteSingleFile()],
	root: 'src/main',
	build: {
		target: 'es6',
		lib: {
			fileName: 'main',
			entry: 'main.ts',
			formats: ['es'],
		},
		emptyOutDir: false,
		cssCodeSplit: false,
		minify: true,
	},
	resolve: {
		alias: {
			'@shared': resolve('src', 'shared'),
			'@main': resolve('src', 'main'),
			'@ui': resolve('src', 'ui'),
		},
	},
});
