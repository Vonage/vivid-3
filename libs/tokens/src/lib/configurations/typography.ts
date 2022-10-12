import { prefix, buildPath } from './common/config';

export const getTypographyConfig = (viewport: string) => ({
	source: [
		"blueprint.tokens/typography.tokens.json"
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/font.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/typography/${viewport}.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "font/shorthand", "resolveMath",],
			prefix,
			buildPath,
			files: [{
				destination: `typography/_${viewport}.mixin.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: "@mixin variables"
				}
			}]
		}
	}
});
