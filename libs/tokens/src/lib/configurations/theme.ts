module.exports = (theme: string) => ({
	source: [
		"blueprint.tokens/theme.tokens.json",
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/alphahex.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/palette.tokens.json',
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/${theme}/**/*.tokens.json`
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
