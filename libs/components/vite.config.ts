/// <reference types="vitest/config" />
import * as path from 'path';
import * as fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import baseConfig from './vite.config.base';

function generateRollupInput() {
	const locales = fs.readdirSync('./src/locales');
	const components = fs
		.readdirSync('./src/lib/', {
			withFileTypes: true,
		})
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	return {
		index: 'src/index.ts',
		...Object.fromEntries(
			locales.map((locale) => [
				`locales/${path.parse(locale).name}`,
				`src/locales/${locale}`,
			])
		),
		// Force vite to split up the build. This is important to enable tree-shaking
		...Object.fromEntries(
			components.map((componentName) => [
				`${componentName}/definition`,
				`src/lib/${componentName}/definition.ts`,
			])
		),
	};
}

const input = generateRollupInput();

const isWatchMode = process.env.WATCH_MODE === 'true';

export default mergeConfig(
	baseConfig,
	defineConfig({
		test: {
			setupFiles: ['vitest.setup.ts'],

			pool: 'threads',
			poolOptions: {
				threads: {
					useAtomics: true,
				},
			},
		},

		plugins: [
			viteStaticCopy({
				targets: [
					{
						src: './api-extractor.json',
						dest: '.',
					},
					{
						src: './custom-elements.json',
						dest: '.',
					},
					{
						src: './.npmignore',
						dest: '.',
					},
					{
						src: './README.md',
						dest: '.',
					},
					{
						src: `${
							new URL(await import.meta.resolve('@repo/styles/dist')).pathname
						}/*`,
						dest: './styles',
					},
				],
			}),
			!isWatchMode
				? dts({
						skipDiagnostics: true,
				  })
				: undefined,
		],
		build: {
			emptyOutDir: true,
			lib: {
				entry: input,
				name: 'components',
				formats: ['es', 'cjs'],
			},
			minify: false,
			rollupOptions: {
				external: [
					'@microsoft/fast-element',
					'@microsoft/fast-web-utilities',
					'video.js',
					'@floating-ui/dom',
					'dropzone',
					'prosemirror-state',
					'prosemirror-model',
					'prosemirror-view',
					'prosemirror-keymap',
					'prosemirror-commands',
					'prosemirror-schema-basic',
					'date-fns',
					'ramda',
					'uuid',
				],
				input,
				output: [
					{
						format: 'es',
						chunkFileNames: 'unbundled/[name].js',
					},
					{
						format: 'cjs',
						chunkFileNames: 'unbundled/[name].cjs',
					},
				],
			},
		},
	})
);
