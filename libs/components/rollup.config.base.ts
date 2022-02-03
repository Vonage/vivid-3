const typescript = require('@rollup/plugin-typescript');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const litCss = require('rollup-plugin-lit-css').default;
const {renderSync} = require('sass');

const BASE_CONFIG = {
	watch: {
		clearScreen: false,
	},
	plugins: [
		typescript({
			noEmitOnError: true,
			tsconfig: './libs/components/tsconfig.lib.json',
		}),
		litCss({
			specifier: '@microsoft/fast-element',
			include: ['/**/*.scss'],
			transform: (data, { filePath }) => {
				console.log(filePath);
				return renderSync({ data, file: filePath }).css.toString();
			},
		}),
		nodeResolve(),
	],
};

module.exports = BASE_CONFIG;
