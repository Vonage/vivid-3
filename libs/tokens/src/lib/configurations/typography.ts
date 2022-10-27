import { prefix, buildPath } from './common/config';

export const getTypographyConfig = (viewport: string) => ({
	source: [
		"blueprint.tokens/typography.tokens.json"
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/font.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/typography/${viewport}.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "font/shorthand", "size/px"],
			prefix,
			buildPath,
			files: [{
				destination: '_typography.tokens.scss',
				format: "css/themeableVariables",
				filter: token => isTypography(token) || token.public,
				options: {
					selector
				}
			}]
		}
	}
};
