
import { prefix, buildPath } from './common/config';

export const scssConstantsConfig = {
	source: [
		"blueprint.tokens/**/*.tokens.json"
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/**/*.tokens.json'
	],
	platforms: {
		scssConstants: {
			transforms: ["name/cti/kebab"],
			prefix,
			buildPath,
			files: [{
				destination: `_constants.scss`,
				format: "scss/constants",
				filter: "sourceOnly"
			}]
		}
	}
};
