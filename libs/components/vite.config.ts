/// <reference types="vitest" />
import * as path from 'path';
import * as fs from 'fs';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';


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

input.index = path.join(process.cwd(), 'libs/components/src/index.ts');

export default defineConfig({
	cacheDir: '../../../node_modules/.vite/components',

	plugins: [
		viteStaticCopy({
			targets: [
				{
					'src': './api-extractor.json',
					'dest': '.'
				},
				{
					'src': './.npmignore',
					'dest': '.'
				},
				{
					'src': './README.md',
					'dest': '.'
				},
				{
					'src': '../../dist/libs/styles/tokens/**/*.css',
					'dest': './styles/tokens'
				},
				{
					'src': '../../dist/libs/styles/fonts/**/*.{css,woff,woff2}',
					'dest': './styles/fonts'
				},
				{
					'src': '../../dist/libs/styles/core/**/*.css',
					'dest': './styles/core'
				}
			]
		}),
		dts({
			entryRoot: 'src',
			tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
			skipDiagnostics: true,
		}),

		viteTsConfigPaths({
			root: '../../',
		}),
	],

	worker: {
	 plugins: [
	   viteTsConfigPaths({
	     root: '../../',
	   }),
	 ],
	},

	// Configuration for building your library.
	// See: https://vitejs.dev/guide/build.html#library-mode
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: input,
			name: 'components',
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ['es'],
		},
		minify: false,
		target: 'esnext',
		rollupOptions: {
			input,
			output: {
				format: 'esm',
				chunkFileNames: 'shared/[name].js'
			}
		},
	}
});
