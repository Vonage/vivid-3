import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
	input: './apps/docs/assets/bundled-scripts/live-sample.js',
	output: {
		dir: './dist/apps/docs/assets/scripts/',
		format: 'esm'
	},
	plugins: [nodeResolve(), terser()]
};
