const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const fontShorthand = require('./transforms/font-shorthand');
const mathPx = require('./transforms/math-px');
const scssConstants = require('./formatters/scss-constants');
const sizingVariables = require('./formatters/sizing-variables');


const StyleDictionary = require('style-dictionary')
.registerTransform(shadowShorthand)
.registerTransform(fontShorthand)
.registerTransform(mathPx)
.registerFilter(sourceOnly)
.registerFormat(scssConstants)
.registerFormat(sizingVariables)

.registerTransform({
  name: "size/px",
  type: "value",
  transitive: true,
  matcher: (token) =>
    ["fontSizes", "dimension", "borderRadius", "spacing", "sizing"].includes(token.type),
  transformer: (token) => transformDimension(token.value),
})

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

function transformDimension(value) {
  if (value.endsWith("px")) {
    return value;
  }
  return value + "px";
}



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
