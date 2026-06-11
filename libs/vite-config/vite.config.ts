import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import baseViteConfig from './src/base';

export default mergeConfig(
	baseViteConfig,
	defineConfig({
		plugins: [
			dts({
				include: ['src/**/*.ts'],
			}),
		],

		build: {
			lib: {
				entry: ['src/base.ts'],
				formats: ['es', 'cjs'],
			},
			rolldownOptions: {
				external: ['vite'],
			},
		},
	})
);
