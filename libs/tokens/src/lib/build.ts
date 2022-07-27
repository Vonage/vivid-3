const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const StyleDictionary = require('style-dictionary')
	.registerTransform(shadowShorthand)
	.registerFilter(sourceOnly)
	.extend('config.json');

const THEMES = ['light', 'dark'] as const;

const getStyleDictionaryConfig = (theme: typeof THEMES[number]) => ({
	include: [
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/${theme}/color-semantics.tokens.json`
		// `tokens-from-figma/themes/${theme}/color-${scope}.tokens.json`,
		// `tokens-from-figma/themes/${theme}/shadow-${scope}.tokens.json`,
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/rgb", "shadow/shorthand"],
			prefix: "vvd",
			buildPath: `../../../../dist/libs/tokens/scss/themes/`,
			files: [{
				destination: `_${theme}.mixins.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: "@mixin variables"
				}
			}]
		}
	}
});

THEMES.forEach(theme => {
	StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});

