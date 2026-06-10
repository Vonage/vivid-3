import SD from 'style-dictionary';
import { buildPath, prefix, selector } from '../common';
import shadowShorthand from '../transforms/shadow-shorthand';
import { isSource } from '../filters';

SD.registerTransform(shadowShorthand);

export default (theme: string) => ({
	source: [
		`../../data/themes/${theme}/semantics.tokens.json`,
		`../../data/themes/${theme}/elevation.tokens.json`,
	],
	include: ['../../data/globals/color/**/*.tokens.json'],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/kebab', 'shadow/shorthand'],
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
