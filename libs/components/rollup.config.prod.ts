const fs = require('fs');
const path = require('path');
const rollupBaseConfig = require('./rollup.config.base.ts');

/**
 * @param workingFolder
 */
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
	inputObject[`components/${componentName}/index`] = path.join(
		process.cwd(),
		`libs/components/src/lib/${componentName}/index.ts`
	);
	return inputObject;
}, {});

module.exports = function setVividRollupConfig(config) {
	return {
		input,
		output: {
			sourcemap: 'hidden',
			dir: 'dist/libs',
			format: 'esm',
			chunkFileNames: 'components/[name]/chunks/index.js',
		},
		...rollupBaseConfig,
	};
};
