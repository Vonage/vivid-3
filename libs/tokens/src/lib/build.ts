const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const fontShorthand = require('./transforms/font-shorthand');
const resolveMath = require('./transforms/resolve-math');
const scssConstants = require('./formatters/scss-constants');
const sizingScssVariables = require('./formatters/sizing-scss-variables');
const suffixPxCssVariables = require('./formatters/suffix-px-css-variables');


const StyleDictionary = require('style-dictionary')
.registerTransform(shadowShorthand)
.registerTransform(fontShorthand)
.registerTransform(resolveMath)
.registerFilter(sourceOnly)
.registerFormat(scssConstants)
.registerFormat(sizingScssVariables)
.registerFormat(suffixPxCssVariables)


.registerTransform({
  name: "referenceSizingBase",
  type: "value",
  transitive: true,
	matcher: (token) => token.attributes.type === "base",
  transformer: ({ name }) => `var(--${name})`,
});

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

StyleDictionary
	.extend(
		require('./configurations/size')
	).buildAllPlatforms();
