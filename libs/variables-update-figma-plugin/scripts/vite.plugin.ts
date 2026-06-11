import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import baseViteConfig from '@repo/vite-config/base';

export default mergeConfig(
	baseViteConfig,
	defineConfig({
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
	})
);
