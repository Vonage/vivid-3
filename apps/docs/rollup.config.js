import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import path from "path";
import fs from "fs";
import virtual from "@rollup/plugin-virtual";

const EXCLUDED_FOLDERS = ['lib', 'styles'];
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
const components = getFoldersInAFolder('../../dist/libs/components');

const input = components.reduce((inputArray, componentName) => {
	inputArray.push(path.join(
		process.cwd(),
		`dist/libs/components/${componentName}/index.js`
	));
	return inputArray;
}, []);

const importsFile = input.reduce((imports, inputPath) => {
	imports += `import '${inputPath}';\n`;
	return imports;
}, '');

const virtualPlugin = virtual({
	"vivid-components": importsFile
});

export default {
	input: ['./apps/docs/assets/bundled-scripts/live-sample.js', 'vivid-components'],
	output: {
		dir: './dist/apps/docs/assets/scripts/',
		format: 'esm',
		entryFileNames: (chunkInfo) => {
			if (chunkInfo.name === 'live-sample') {
				return 'live-sample.js';
			}
			return 'vivid-components.js';
		}
	},
	plugins: [virtualPlugin, nodeResolve(), terser()]
};
