import SD from 'style-dictionary';
import { buildPath, prefix } from '../common';
import cssAtRuleProperty from '../formatters/@property';

SD.registerFormat(cssAtRuleProperty);

export default {
	source: [
		'../../node_modules/@vonage/vivid-figma-tokens/data/globals/**/*.tokens.json',
	],
	platforms: {
		scss: {
			transforms: ['name/kebab'],
			prefix,
			buildPath,
			files: [
				{
					destination: '@properties.scss',
					format: 'scss/@property',
					filter: (token) => !!(token['@property'] ?? token?.$property),
					options: {
						selector: '@mixin properties',
					},
				},
			],
		},
	},
};
