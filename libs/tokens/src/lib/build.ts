const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const fontShorthand = require('./transforms/font-shorthand');
const constants = require('./formatters/constants');

const StyleDictionary = require('style-dictionary')
.registerTransform(shadowShorthand)
.registerTransform(fontShorthand)
.registerFilter(sourceOnly)
.registerFormat(constants)

const THEMES = require('../../../../node_modules/@vonage/vivid-figma-tokens/data/$themes.json');

process.env.prefix = 'vvd';
process.env.buildPath = '../../../../dist/libs/tokens/scss/';


StyleDictionary
	.extend(
		require('./configurations/constants')
	).buildPlatform('constants');

THEMES.forEach(({ name }) =>
	StyleDictionary
		.extend(
			require('./configurations/theme')(name)
		).buildPlatform('web')
);

['desktop', 'mobile'].forEach(viewport =>
	StyleDictionary
		.extend(
			require('./configurations/typography')(viewport)
		).buildPlatform('web')
);

