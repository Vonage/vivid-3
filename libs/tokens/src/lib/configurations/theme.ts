const SD = require('style-dictionary');

import { prefix, buildPath, selector } from '../common';
import shadowShorthand from '../transforms/shadow-shorthand';
import { isSource } from '../filters';

SD.registerTransform(shadowShorthand);

export default (theme: string) => ({
	source: [
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/${theme}/semantics.tokens.json`,
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/${theme}/elevation.tokens.json`,
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/color/**/*.tokens.json',
	],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'shadow/shorthand'],
			prefix,
			buildPath,
			files: [
				{
					destination: `_theme-${theme}.tokens.scss`,
					format: 'css/variables',
					filter: isSource,
					options: {
						selector,
					},
				},
			],
		},
	},
});
