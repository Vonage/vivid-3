import SD from 'style-dictionary';
import { buildPath, prefix, selector } from '../common';
import scssConstants from '../formatters/scss-constants';
import { isSource } from '../filters';

SD.registerFormat(scssConstants);

export default {
	source: [
		'../../data/themes/light/semantics.tokens.json',
		'../../data/themes/light/elevation.tokens.json',
		'../../data/typography.tokens.json',
	],
	include: ['../../data/globals/**/*.tokens.json'],
	platforms: {
		scss: {
			transforms: ['name/kebab'],
			prefix,
			buildPath,
			files: [
				{
					destination: '_tokens.constants.scss',
					format: 'scss/constants',
					filter: isSource,
					options: {
						selector,
					},
				},
			],
		},
	},
};
