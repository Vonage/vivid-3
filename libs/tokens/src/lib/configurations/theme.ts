module.exports = (theme: string) => ({
	source: [
		"blueprint.tokens/color-semantic.tokens.json",
		"blueprint.tokens/elevation.tokens.json",
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/alphahex.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/palette.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/${theme}/**/*.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "shadow/shorthand"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
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
