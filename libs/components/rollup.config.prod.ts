const fs = require('fs');
const path = require('path');

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
	inputObject[`${componentName}/index`] = path.join(
		process.cwd(),
		`libs/components/src/lib/${componentName}/index.ts`
	);
	return inputObject;
}, {});

module.exports = function setVividRollupConfig(config) {

	input.index = config.input;

	const output = config.output;
	output.chunkFileNames = 'shared/[name].js';
	delete output.name;
	delete output.entryFileNames;


	const plugins = [...config.plugins];
	return {
		input,
		output,
		plugins
	};
};
