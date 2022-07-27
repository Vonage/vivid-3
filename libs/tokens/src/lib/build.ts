const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const constants = require('./formatters/constants');

const StyleDictionary = require('style-dictionary')
.registerTransform(shadowShorthand)
.registerFilter(sourceOnly)
.registerFormat(constants)
.extend('config.json');

const THEMES = require('../../../../node_modules/@vonage/vivid-figma-tokens/data/$themes.json');

const prefix = 'vvd';
const buildPath = '../../../../dist/libs/tokens/scss/themes/';


const getStyleDictionaryConfig = (theme: string) => ({
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/palette.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/${theme}/color-semantics.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/rgb", "shadow/shorthand"],
			prefix,
			buildPath,
			files: [{
				destination: `_${theme}.mixin.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: "@mixin variables"
				}
			}]
		},
		dev: {
			transforms: ["name/cti/kebab"],
			prefix,
			buildPath,
			files: [{
				destination: `_constants.scss`,
				format: "scss/constants",
				filter: "sourceOnly"
			}]
		}
	}
});

StyleDictionary
	.extend(
		getStyleDictionaryConfig(THEMES[0].name)
	).buildPlatform('dev');

THEMES.forEach(({ name }) =>
	StyleDictionary
		.extend(
			getStyleDictionaryConfig(name)
		).buildPlatform('web')
);

