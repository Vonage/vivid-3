const notAliasFilter = require('./filters/not-alias');
const StyleDictionary = require('style-dictionary')
	.registerFilter(notAliasFilter)
	.extend('config.json');


const getStyleDictionaryConfig = (theme: string): any => ({
	source: [
		`tokens-from-figma/mappings/schemes/theme-${theme}-main.tokens.json`
	],
	platforms: {
		web: {
			transformGroup: "web",
			prefix: "vvd",
			buildPath: `../../../../dist/libs/tokens/scss/themes/${theme}/`,
			files: [{
				destination: "_main.scss",
				format: "scss/map-flat",
				filter: "isNotAlias"
			}]
		}
	}
});

['light', 'dark'].forEach(theme => {
	StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});

