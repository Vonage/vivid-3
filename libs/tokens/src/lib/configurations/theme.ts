import { prefix, buildPath } from './common/config';

export const getThemeConfig = (theme: string) => ({
	source: [
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/${theme}/semantics.tokens.json`,
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/${theme}/elevation.tokens.json`
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/alphahex.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/palette.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/${theme}/**/*.tokens.json`
	],
	platforms: {
		css: {
			transforms: ["attribute/cti", "name/cti/kebab", "shadow/shorthand"],
			prefix,
			buildPath,
			files: [{
				destination: `_theme-${theme}.tokens.scss`,
				format: "css/themeableVariables",
				filter: isSource,
				options: {
					selector
				}
			}]
		}
	}
});
