import * as path from 'path';
import * as fs from 'fs';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';

function generateRollupInput() {
	function getListOfComponents() {
		return getFoldersInAFolder('./src/lib/');
	}

	function convertComponentsToRollupInput(components: string[]) {
		return components.reduce<Record<string, string>>(
			(inputObject, componentName) => {
				inputObject[`${componentName}/index`] = path.join(
					process.cwd(),
					`libs/components/src/lib/${componentName}/index.ts`
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
			`libs/components/src/locales/${locale}`
		);
	});

	input.index = path.join(process.cwd(), 'libs/components/src/index.ts');

	return input;
}

const input = generateRollupInput();

const packageVersion = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
).version;

const isWatchMode = process.env.WATCH === 'true';
const isCI = process.env['CI'] === 'true';
const isA11y = process.env['A11Y'] === 'true';

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: isA11y ? ['src/**/*.a11y.spec.ts'] : ['src/**/*.spec.ts'],
		setupFiles: ['vitest.setup.ts'],
		reporters: ['default'],
		coverage: {
			reportsDirectory: '../../coverage/libs/components',
			provider: 'v8',
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.spec.ts', 'src/**/*test*.ts', 'src/locales/**.*'],
			reporter: isCI
				? ['lcov', 'text']
				: ['text', 'html', 'clover', 'json', 'lcov'],
		},
		pool: 'threads',
		poolOptions: {
			useAtomics: true,
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
		!isWatchMode
			? dts({
					entryRoot: 'src',
					tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
					skipDiagnostics: true,
			  })
			: undefined,
		nxViteTsPaths(),
	],
	cacheDir: '../../../node_modules/.vite/components',
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
			},
		},
	},
	worker: {
		plugins: () => [nxViteTsPaths()],
	},
});
