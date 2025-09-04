/// <reference types="vitest/config" />
import * as fs from 'fs';
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

// In addition to the regular, unbundled build, this config produces a bundled versions of each component
// These can be imported directly in the browser

function generateRollupInput() {
	const components = fs
		.readdirSync('./src/lib/', {
			withFileTypes: true,
		})
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	return Object.fromEntries(
		components.map((componentName) => [
			`${componentName}/index`,
			`src/lib/${componentName}/index.ts`,
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
			},
			minify: true,
			rollupOptions: {
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
