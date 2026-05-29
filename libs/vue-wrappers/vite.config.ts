import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		dedupe: ['vue'],
	},

	optimizeDeps: {
		exclude: ['vue', '@vonage/vivid'],
	},

	define: {
		// Prevent vite from replacing import.meta.env?.SSR with false:
		__IMPORT_META_ENV_PLACEHOLDER__: 'import.meta.env',
	},

	build: {
		reportCompressedSize: true,
		lib: {
			entry: 'src/index.ts',
			name: 'vivid-vue',
			fileName: 'index',
			formats: ['es', 'cjs'],
			cssFileName: 'style',
		},
		minify: false,
		target: 'esnext',
		rolldownOptions: {
			external: ['vue', '@vonage/vivid'],
			output: {
				codeSplitting: false,
				globals: {
					vue: 'Vue',
					'@vonage/vivid': 'Vivid',
				},
			},
		},
	},
});
