const notAliasFilter = require('./filters/not-alias');
const StyleDictionary = require('style-dictionary')
	.registerFilter(notAliasFilter)
	.extend('libs/tokens/src/lib/config.json');

const themes = ['light'];
themes.forEach(brand => {
  StyleDictionary.extend({
    // include: [`tokens/default/**/*.json`],
		source: [
			`libs/tokens/src/lib/tokens-from-figma/mappings/schemes/theme-${brand}-main.tokens.json`
		],
  }).buildAllPlatforms();
});

