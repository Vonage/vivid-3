import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import path from 'path';
import fs from 'fs';
import virtual from '@rollup/plugin-virtual';
import replace from '@rollup/plugin-replace';

const DEV_MODE = process.env['DEV_MODE'] === 'true';

const EXCLUDED_FOLDERS = ['lib', 'styles', 'src'];
const componentsFolder = path.join(__dirname, '../../dist/libs/components');

function getFoldersInAFolder(workingFolder = './src/lib/') {
	const folders = [];
	const testsFolder = path.join(__dirname, workingFolder);
	fs.readdirSync(testsFolder).forEach((testFolder) => {
		if (EXCLUDED_FOLDERS.includes(testFolder)) return;
		const absolutePath = path.join(testsFolder, testFolder);
		if (fs.statSync(absolutePath).isDirectory()) {
			folders.push(testFolder);
		}
	});
	return folders;
}
function getVividVersion() {
	const packageJson = fs.readFileSync(
		path.join(componentsFolder, 'package.json'),
		'utf8'
	);
	const packageObject = JSON.parse(packageJson);
	return packageObject.version;
}

// Import locales and make them globally available to support locale switching
function getLocaleImports() {
	const locales = fs
		.readdirSync(path.join(__dirname, '../../dist/libs/components/locales'))
		.filter((file) => file.endsWith('.js'))
		.sort();
	const localeName = (localeFile) => localeFile.replace('.js', '');
	const camelCasedLocaleName = (localeFile) =>
		localeName(localeFile).replace(/-/g, '');
	return `
	import { setLocale } from 'dist/libs/components/index.js';
	${locales
		.map(
			(localeFile) =>
				`import ${camelCasedLocaleName(
					localeFile
				)} from 'dist/libs/components/locales/${localeFile}';`
		)
		.join('\n')}

	window.locales = {
		${locales
			.map(
				(localeFile) =>
					`'${localeName(localeFile)}': ${camelCasedLocaleName(localeFile)}`
			)
			.join(',\n')}
	};
	window.setLocale = setLocale;
`;
}

const getComponentImports = () =>
	getFoldersInAFolder('../../dist/libs/components')
		.filter((folder) => folder !== 'locales')
		.map((folder) =>
			path.join(process.cwd(), `dist/libs/components/${folder}/index.js`)
		)
		.map((indexFile) => `import '${indexFile}';`)
		.join('\n');

const virtualPlugin = virtual({
	'vivid-components': `
		${getComponentImports()}
		${getLocaleImports()}
	`,
});

const DIRS = [
	'./dist/apps/docs/assets/scripts/',
	'./dist/apps/docs/assets/scripts/',
	'./dist/apps/docs/assets/scripts/',
	'./dist/apps/docs/assets/scripts/',
	'./dist/apps/docs/assets/scripts/',
	'./dist/apps/docs',
];
export default [
	'./apps/docs/assets/bundled-scripts/live-sample.js',
	'./apps/docs/assets/bundled-scripts/cache-assets.js',
	'./apps/docs/assets/bundled-scripts/icons-gallery.js',
	'./apps/docs/assets/bundled-scripts/turbolinks.js',
	'vivid-components',
	'./apps/docs/assets/bundled-scripts/sw.js',
].map((input, index) => {
	return {
		input,
		output: {
			dir: DIRS[index],
			format: 'esm',
			entryFileNames: (chunkInfo) => {
				if (chunkInfo.name.includes('vivid-components')) {
					return 'vivid-components.js';
				}
				return `${chunkInfo.name}.js`;
			},
		},
		plugins: [
			virtualPlugin,
			nodeResolve(),
			replace({
				values: {
					SW_VERSION: () =>
						DEV_MODE ? new Date().getTime() : getVividVersion(),
				},
				preventAssignment: true,
			}),
			terser(),
		],
	};
});
