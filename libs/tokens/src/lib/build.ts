const sourceOnly = require('./filters/source-only');
const shadowShorthand = require('./transforms/shadow-shorthand');
const StyleDictionary = require('style-dictionary')
	.registerTransform(shadowShorthand)
	.registerFilter(sourceOnly)
	.extend('config.json');

const THEMES = ['light', 'dark'] as const;
const SCOPES = ['main', 'alternate'] as const;

const getStyleDictionaryConfig = (theme: typeof THEMES[number], scope: typeof SCOPES[number]) => ({
	include: [
		`tokens-from-figma/themes/${theme}/color-${scope}.tokens.json`,
		`tokens-from-figma/themes/${theme}/shadow-${scope}.tokens.json`,
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "size/px", "color/rgb", "shadow/shorthand"],
			prefix: "vvd",
			buildPath: `../../../../dist/libs/tokens/scss/themes/${theme}/`,
			files: [{
				destination: `_${scope}.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: scope == 'main'
						? ":root, .vvd-theme-main, ::part(vvd-theme-main)"
						: ".vvd-theme-alternate, ::part(vvd-theme-alternate)",
				}
			}]
		}
	}
});

THEMES.forEach(theme => {
	SCOPES.forEach(scope => {
		StyleDictionary.extend(getStyleDictionaryConfig(theme, scope)).buildAllPlatforms();
	});
});

