module.exports = {
	source: [
		"blueprint.tokens/sizing.tokens.json"
	],
	include: [
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/sizing/desktop.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "math/px"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
			files: [{
				destination: `sizing/_desktop.mixin.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: "@mixin variables"
				}
			}]
		},
		scss: {
			transforms: ["attribute/cti", "name/cti/kebab", "math/px"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
			files: [{
				destination: `sizing/_variables.scss`,
				format: "scss/variables"
			}]
		}
	}
};
