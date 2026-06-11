import path from 'node:path';
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import baseViteConfig from '@repo/vite-config/base';

export default mergeConfig(
	baseViteConfig,
	defineConfig({
		plugins: [
			dts({
				insertTypesEntry: true,
			}),
		],
		build: {
			lib: {
				entry: path.resolve(__dirname, 'src/index.ts'),
				name: 'VividReactWrapper',
				formats: ['es', 'umd', 'cjs'],
				fileName: (format) => `index.${format}.js`,
			},
			rolldownOptions: {
				external: ['lodash', 'react'],
				output: {
					exports: 'named',
					globals: {
						lodash: 'lodash',
						react: 'react',
					},
				},
			},
		},
	})
);
