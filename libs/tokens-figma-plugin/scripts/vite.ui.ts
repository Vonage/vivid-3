import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
	plugins: [react(), viteSingleFile()],
	root: 'src/ui',
	build: {
		lib: {
			fileName: 'index',
			entry: 'index.html',
			formats: ['es'],
		},
		emptyOutDir: false,
		cssCodeSplit: false,
		minify: true,
		cssMinify: false, // disable due to broken CSS in figma-kit: "var(var(--font-size-2))"
	},
	resolve: {
		alias: {
			'@shared': resolve('src', 'shared'),
			'@main': resolve('src', 'main'),
			'@ui': resolve('src', 'ui'),
		},
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production'),
	},
});
