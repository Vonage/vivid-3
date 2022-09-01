module.exports = {
	source: [
		"blueprint.tokens/**/*.tokens.json"
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/**/*.tokens.json'
	],
	platforms: {
		constants: {
			transforms: ["name/cti/kebab"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
			files: [{
				destination: `_constants.scss`,
				format: "scss/constants",
				filter: "sourceOnly"
			}]
		}
	}
};
