/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import baseVitestConfig from '@repo/vitest-config/base';

export default mergeConfig(
	baseVitestConfig,
	defineConfig({
		plugins: [dts()],

		build: {
			lib: {
				entry: 'src/index.ts',
				fileName: 'index',
				formats: ['es'],
			},
			rollupOptions: {
				external: [
					'@custom-elements-manifest/analyzer',
					'@custom-elements-manifest/analyzer/src/utils/mixins.js',
					'sass',
					'fs',
					'path',
					'url',
					'glob',
					'minimatch',
					'custom-elements-manifest',
				],
			},
		},
	})
);
