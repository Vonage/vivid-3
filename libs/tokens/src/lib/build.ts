const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const resolveMath = require('./transforms/resolve-math');
const fontShorthand = require('./transforms/font-shorthand');
const scssConstants = require('./formatters/scss-constants');

const StyleDictionary = require('style-dictionary')
.registerTransform(shadowShorthand)
.registerTransform(fontShorthand)
.registerTransform(resolveMath)
.registerFilter(sourceOnly)
.registerFormat(scssConstants)

const THEMES = require('../../../../node_modules/@vonage/vivid-figma-tokens/data/$themes.json');

process.env.prefix = 'vvd';
process.env.buildPath = '../../../../dist/libs/tokens/scss/';


StyleDictionary
	.extend(
		require('./configurations/scss-constants')
	).buildPlatform('scssConstants');

THEMES.forEach(({ name }) =>
	StyleDictionary
		.extend(
			require('./configurations/theme')(name)
		).buildPlatform('web')
);

['desktop'/*, 'mobile'*/].forEach(viewport =>
	StyleDictionary
		.extend(
			require('./configurations/typography')(viewport)
		).buildPlatform('web')
);

