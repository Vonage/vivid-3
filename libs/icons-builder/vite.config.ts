/// <reference types="vitest" />
import { defineConfig } from 'vite';
//import { uploadFolderToS3 } from './src/s3Uploader';

import * as path from 'path';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/icons-builder',
	mode: 'development',

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		dedupe: ['icons-builder'],
	},

	optimizeDeps: {
		exclude: ['icons-builder', '@vonage/vivid'],
	},

	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'icons-builder',
			fileName: 'index',
		},
		minify: false,
		target: 'esnext',
		rollupOptions: {
			external: ['icons-builder', '@vonage/vivid'],
			input: './src/index.ts',
			output: {
				entryFileNames: 'index.js',
				globals: {
					'@vonage/vivid': 'Vivid',
				},
				inlineDynamicImports: true,
			},
		},
		outDir: 'dist',
		emptyOutDir: true,
	},
	// plugins: [
	// 	{
	// 		name: 'upload-to-s3',
	// 		generateBundle() {
	// 			uploadFolderToS3();
	// 		},
	// 	},
	// ],
});
