const SD = require('style-dictionary');

import { prefix, buildPath, selector } from './common/config';
import { isSource } from '../filters';

SD.registerTransform({
  name: "wrapWithCalc",
  type: "value",
  transitive: true,
	matcher: isSource,
  transformer: ({ value }) => `calc(${value})`,
});

export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/size.tokens.json',
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/size.tokens.json'
	],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath'],
			prefix,
			buildPath,
			files: [{
				destination: '_size.tokens.scss',
				format: 'css/themeableVariables',
				filter: token => token.public,
				options: {
					selector
				},
			}]
		},
		scss: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'wrapWithCalc'],
			prefix,
			buildPath,
			files: [{
				destination: '_size.variables.scss',
				format: 'sass/themeableVariables',
				filter: isSource,
			}],
		}
	}
};
