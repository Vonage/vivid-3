module.exports = (viewport: string) => ({
	source: [
		"blueprint.tokens/typography.tokens.json"
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/font.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/typography/${viewport}.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "size/px", "font/shorthand"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
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
