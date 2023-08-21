import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import path from "path";
import fs from "fs";
import virtual from "@rollup/plugin-virtual";
import replace from "@rollup/plugin-replace";

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
	const packageJson = fs.readFileSync(path.join(componentsFolder, 'package.json'), 'utf8');
	const packageObject = JSON.parse(packageJson);
	return packageObject.version;
}
const components = getFoldersInAFolder('../../dist/libs/components');

const input = components.reduce((inputArray, componentName) => {
	if (componentName === 'locales') return inputArray;

	inputArray.push(path.join(
		process.cwd(),
		`dist/libs/components/${componentName}/index.js`
	));
	return inputArray;
}, []);

// Import locales and make them globally available to support locale switching
const locales = fs
	.readdirSync(path.join(__dirname, '../../dist/libs/components/locales'))
	.filter((file) => file.endsWith('.js'))
	.sort();
const localeName = (localeFile) => localeFile.replace('.js', '');
const camelCasedLocaleName = (localeFile) =>
	localeName(localeFile).replace(/-/g, '');
const localesInput = `
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

const importsFile = input.reduce((imports, inputPath) => {
	imports += `import '${inputPath}';\n`;
	return imports;
}, localesInput);

const virtualPlugin = virtual({
	"vivid-components": importsFile
});

const DIRS = ['./dist/apps/docs/assets/scripts/', './dist/apps/docs/assets/scripts/', './dist/apps/docs/assets/scripts/', './dist/apps/docs'];
export default [
	'./apps/docs/assets/bundled-scripts/live-sample.js', './apps/docs/assets/bundled-scripts/cache-assets.js', 'vivid-components',
	'./apps/docs/assets/bundled-scripts/sw.js'].map((input, index) => {
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
			}
		},
		plugins: [virtualPlugin, nodeResolve(),
			replace({
				values: {
					'SW_VERSION': () => DEV_MODE ? new Date().getTime() : getVividVersion()
				},
				preventAssignment: true
		}),
			terser() ]
	}
});
