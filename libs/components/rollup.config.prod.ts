const fs = require('fs');
const path = require('path');
const replace = require('@rollup/plugin-replace');
const postcss = require('rollup-plugin-postcss');

/**
 *
 *
 * @param {string} [workingFolder='./src/lib/'] src
 * @returns {*} folders
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

/** @type {*} */
const components = getFoldersInAFolder();
const input = components.reduce((inputObject, componentName) => {
	inputObject[`${componentName}/index`] = path.join(
		process.cwd(),
		`libs/components/src/lib/${componentName}/index.ts`
	);
	return inputObject;
}, {});

module.exports = function setVividRollupConfig(config) {
	const postcssPlugin = postcss({
		inject: false,
		extract: false,
		autoModules: true,
		plugins: [],
		use: {
			less: {
				javascriptEnabled: true,
			},
		},
	});
	input.index = config.input;

	const output = config.output;
	output.chunkFileNames = 'shared/[name].js';
	delete output.name;
	delete output.entryFileNames;

	const postcssIndex = config.plugins.findIndex(plugin => plugin.name === 'postcss');
	config.plugins[postcssIndex] = postcssPlugin;

	const plugins = [...config.plugins,
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		})];
	return {
		input,
		output,
		plugins
	};
};
