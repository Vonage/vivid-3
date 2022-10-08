module.exports = {
	source: [
		"blueprint.tokens/sizing.tokens.json"
	],
	include: [
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/sizing/scale.tokens.json`
	],
	platforms: {
		web: {
			transforms: ["attribute/cti", "name/cti/kebab", "math/px"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
			files: [{
				destination: `sizing/_scale.mixin.scss`,
				format: "css/variables",
				filter: "sourceOnly",
				options: {
					selector: "@mixin variables"
				}
			}]
		}
	}
};
