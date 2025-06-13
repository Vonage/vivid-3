/// <reference types="vitest/config" />
import * as path from 'path';
import * as fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { NodePackageImporter } from 'sass';
import vitestBaseConfig from '@repo/vitest-config/ui';

function generateRollupInput() {
	function getListOfComponents() {
		return getFoldersInAFolder('./src/lib/');
	}

	function convertComponentsToRollupInput(components: string[]) {
		return components.reduce<Record<string, string>>(
			(inputObject, componentName) => {
				inputObject[`${componentName}/index`] = path.join(
					process.cwd(),
					`src/lib/${componentName}/index.ts`
				);
				return inputObject;
			},
			{}
		);
	}

	function getFoldersInAFolder(workingFolder = './src/lib/') {
		const folders: string[] = [];
		const fullWorkingFolderPath = path.join(__dirname, workingFolder);
		fs.readdirSync(fullWorkingFolderPath).forEach((testFolder) => {
			if (testFolder === 'common') return;
			const absolutePath = path.join(fullWorkingFolderPath, testFolder);
			if (fs.statSync(absolutePath).isDirectory()) {
				folders.push(testFolder);
			}
		});
		return folders;
	}

	const components = getListOfComponents();
	const input = convertComponentsToRollupInput(components);

	const locales = fs.readdirSync(path.join(__dirname, './src/locales'));
	locales.forEach((locale) => {
		input[`locales/${path.parse(locale).name}`] = path.join(
			process.cwd(),
			`src/locales/${locale}`
		);
	});

	input.index = path.join(process.cwd(), 'src/index.ts');

	return input;
}

const input = generateRollupInput();

const packageVersion = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
).version;

const isWatchMode = process.env.WATCH_MODE === 'true';

export default mergeConfig(
	vitestBaseConfig,
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
			watch: isWatchMode
				? {
						exclude: ['**/*.md'],
				  }
				: null,
		},
		define: {
			__PACKAGE_VERSION__: JSON.stringify(packageVersion),
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					importers: [new NodePackageImporter()],
				},
			},
		},
	})
);
