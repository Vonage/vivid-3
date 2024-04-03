const SD = require('style-dictionary');

import { prefix, buildPath, selector } from '../common';
import fontSize from '../transforms/font-size';
import typographyShorthand from '../transforms/typography-shorthand';
import { isTypography } from '../filters';

SD.registerTransform(fontSize);
SD.registerTransform(typographyShorthand);

export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/font.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/typography-scale.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/typography.tokens.json',
	],
	platforms: {
		css: {
			transforms: [
				'attribute/cti',
				'name/cti/kebab',
				'size/px',
				'type/fontSize',
				'typography/shorthand',
				'public/cssReferences',
			],
			prefix,
			buildPath,
			files: [
				{
					destination: '_typography.tokens.scss',
					format: 'css/variables',
					filter: isTypography,
					options: {
						selector,
					},
				},
			],
		},
	},
};
