/// <reference types="vitest" />
import * as path from 'path';
import * as fs from 'fs';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import { codecovVitePlugin } from '@codecov/vite-plugin';

function getFoldersInAFolder(workingFolder = './src/lib/') {
	const folders = [];
	const testsFolder = path.join(__dirname, workingFolder);
	fs.readdirSync(testsFolder).forEach((testFolder) => {
		if (testFolder === 'common') return;
		const absolutePath = path.join(testsFolder, testFolder);
		if (fs.statSync(absolutePath).isDirectory()) {
			folders.push(testFolder);
		}
	});
	return folders;
}

const components = getFoldersInAFolder();
const input = components.reduce((inputObject, componentName) => {
	inputObject[`${componentName}/index`] = path.join(
		process.cwd(),
		`libs/components/src/lib/${componentName}/index.ts`
	);
	return inputObject;
}, {});

const locales = fs.readdirSync(path.join(__dirname, './src/locales'));
locales.forEach((locale) => {
	input[`locales/${path.parse(locale).name}`] = path.join(
		process.cwd(),
		`libs/components/src/locales/${locale}`
	);
});

input.index = path.join(process.cwd(), 'libs/components/src/index.ts');

export default defineConfig({
	cacheDir: '../../../node_modules/.vite/components',

	plugins: [
		viteStaticCopy({
			targets: [
				{
					src: './api-extractor.json',
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
					src: '../../dist/libs/styles/tokens/**/*.css',
					dest: './styles/tokens',
				},
				{
					src: '../../dist/libs/styles/fonts/**/*.{css,woff,woff2}',
					dest: './styles/fonts',
				},
				{
					src: '../../dist/libs/styles/core/**/*.css',
					dest: './styles/core',
				},
			],
		}),
		dts({
			entryRoot: 'src',
			tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
			skipDiagnostics: true,
		}),

		nxViteTsPaths(),

		codecovVitePlugin({
			enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
			bundleName: 'vivid',
			uploadToken: process.env.CODECOV_TOKEN,
		}),
	],

	worker: {
		plugins: [nxViteTsPaths()],
	},

	build: {
		lib: {
			entry: input,
			name: 'components',
			formats: ['es', 'cjs'],
		},
		minify: false,
		cssMinify: true,
		target: 'esnext',
		rollupOptions: {
			input,
			output: [
				{
					format: 'es',
					chunkFileNames: 'shared/[name].js',
				},
				{
					format: 'cjs',
					chunkFileNames: 'shared/[name].cjs',
				},
			],
		},
	},
});
