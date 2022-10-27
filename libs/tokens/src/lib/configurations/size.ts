import { prefix, buildPath, selector } from '../common';
import { isSource } from '../filters';


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
			transforms: ['attribute/cti', 'name/cti/kebab'],
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
