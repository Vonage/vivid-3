const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const litCss = require('rollup-plugin-lit-css').default;
const copy = require('rollup-plugin-copy');
const {renderSync} = require('sass');

const {targets: {build: {options: {assets}}}} = require('./project.json');

const targets = assets.map(asset => ({
	src: path.join(asset.input, asset.glob),
	dest: path.join('./dist/libs/components/', asset.output)
}));

const BASE_CONFIG = {
	watch: {
		clearScreen: false,
	},
	plugins: [
		copy({targets}),
		typescript({
			noEmitOnError: true,
			tsconfig: './libs/components/tsconfig.lib.json',
		}),
		litCss({
			specifier: '@microsoft/fast-element',
			include: ['/**/*.scss'],
			transform: (data, {filePath}) => {
				console.log(filePath);
				return renderSync({
					data,
					file: filePath
				})
					.css
					.toString();
			},
		}),
		nodeResolve(),
	],
};

module.exports = BASE_CONFIG;
