import { prefix, buildPath } from './common/config';

const isBase = token => token.attributes.type === 'base';

export const sizeConfig = {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/sizing/desktop.tokens.json'
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/sizing/base.tokens.json',
	],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath'],
			prefix,
			buildPath,
			files: [{
				destination: 'size/_base.mixin.scss',
				format: 'suffixPxCssVariables',
				options: {
					selector: '@mixin variables'
				},
				filter: isBase,
			}]
		},
		scss: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'referenceSizingBase', 'resolveMath'],
			prefix,
			buildPath,
			files: [{
				destination: 'size/_variables.scss',
				format: 'sizingScssVariables',
				filter: 'sourceOnly',
			}],
		}
	}
};
