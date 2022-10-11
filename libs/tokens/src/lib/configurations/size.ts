module.exports = {
	source: [
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/sizing/base.tokens.json`,
		`../../../../node_modules/@vonage/vivid-figma-tokens/data/sizing/desktop.tokens.json`
	],
	platforms: {
		css: {
			transforms: ["attribute/cti", "name/cti/kebab", "resolveMath"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
			files: [{
				destination: `sizing/_base.mixin.scss`,
				format: "css/variables",
				options: {
					selector: "@mixin variables"
				},
				filter: token => token.attributes.type === "base",
			}]
		},
		scss: {
			transforms: ["attribute/cti", "name/cti/kebab", "referenceSizingBase", "resolveMath"],
			prefix: process.env.prefix,
			buildPath: process.env.buildPath,
			files: [{
				destination: 'sizing/_variables.scss',
				format: "sizingScssVariables",
				filter: token => !["base", "unit", "unitMultiplier"].includes(token.attributes.type),
			}],
		}
	}
};
