import SD from 'style-dictionary';
import { buildPath, prefix, selector } from '../common';
import fontSize from '../transforms/font-size';
import typographyShorthand from '../transforms/typography-shorthand';
import { isTypography } from '../filters';

SD.registerTransform(fontSize);
SD.registerTransform(typographyShorthand);

export default {
	source: [
		'../../data/globals/font.tokens.json',
		'../../data/globals/typography-scale.tokens.json',
		'../../data/typography.tokens.json',
	],
	platforms: {
		css: {
			transforms: [
				'attribute/cti',
				'name/kebab',
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
