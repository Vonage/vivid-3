const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const StyleDictionary = require('style-dictionary')
	.registerTransform(shadowShorthand)
	.registerFilter(sourceOnly)
	.extend('config.json');

const getStyleDictionaryConfig = (theme: string): any => ({
	include: [
		`tokens-from-figma/schemes/${theme}/**/*.tokens.json`,
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/rgb", "shadow/shorthand"],
			prefix: "vvd",
			buildPath: `../../../../dist/libs/tokens/scss/themes/${theme}/`,
			files: [{
				destination: "_main.scss",
				format: "css/variables",
				filter: "sourceOnly"
			}]
		}
	}
});

['light', 'dark'].forEach(theme => {
	StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});

