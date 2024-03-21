const SD = require('style-dictionary');

import { prefix, buildPath } from '../common';
import cssAtRuleProperty from '../formatters/@property';

SD.registerFormat(cssAtRuleProperty);

export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/**/*.tokens.json',
	],
	platforms: {
		scss: {
			transforms: ['name/cti/kebab'],
			prefix,
			buildPath,
			files: [
				{
					destination: '@properties.scss',
					format: 'scss/@property',
					filter: (token) => token['@property'],
					options: {
						selector: '@mixin properties',
					},
				},
			],
		},
	},
};
