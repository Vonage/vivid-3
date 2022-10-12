import { prefix, buildPath } from './common/config';

export const getThemeConfig = (theme: string) => ({
	source: [
		"blueprint.tokens/theme.tokens.json",
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/alphahex.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/palette.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/${theme}/**/*.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "shadow/shorthand"],
			prefix,
			buildPath,
			files: [{
				destination: `themes/_${theme}.mixin.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: "@mixin variables"
				}
			}]
		}
	}
});
