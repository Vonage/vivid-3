import { defineConfig, mergeConfig } from 'vite';
import baseViteConfig from '@repo/vite-config/base';

export default mergeConfig(
	baseViteConfig,
	defineConfig({
		build: {
			emptyOutDir: false,
			lib: {
				entry: 'src/index.js',
				name: 'vivid-react',
				formats: ['cjs'],
				fileName: () => 'index.js',
			},
			minify: false,
			rolldownOptions: {
				external: [
					/^react(\/.*)?/,
					/^react-dom(\/.*)?/,
					/^@vonage\/.*/,
					'prop-types',
				],
				output: {
					exports: 'named',
				},
			},
		},
	})
);
