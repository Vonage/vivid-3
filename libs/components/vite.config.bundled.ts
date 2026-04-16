/// <reference types="vitest/config" />
import * as fs from 'fs';
import * as path from 'path';
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

// In addition to the regular, unbundled build, this config produces a bundled versions of each component
// These can be imported directly in the browser

function generateRollupInput() {
	const components = fs.globSync('*/index.ts', { cwd: './src/lib/' });

	return Object.fromEntries(
		components.map((componentDefinitionPath) => [
			componentDefinitionPath.replace('.ts', ''),
			path.resolve('src', 'lib', componentDefinitionPath),
		])
	);
}

const input = generateRollupInput();

export default mergeConfig(
	baseConfig,
	defineConfig({
		build: {
			outDir: 'dist',
			emptyOutDir: false,
			lib: {
				entry: input,
				name: 'components',
				formats: ['es', 'cjs'],
				cssFileName: 'style',
			},
			minify: true,
			rolldownOptions: {
				input,
				output: [
					{
						format: 'es',
						chunkFileNames: 'bundled/[name].js',
					},
					{
						format: 'cjs',
						chunkFileNames: 'bundled/[name].cjs',
					},
				],
			},
		},
	})
);
