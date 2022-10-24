
const SD = require('style-dictionary');

import { prefix, buildPath } from './common/config';
import cssThemeableVariables from '../formatters/scss-constants';
import { isSource } from '../filters';

SD.registerFormat(cssThemeableVariables);


export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/light/semantics.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/themes/light/elevation.tokens.json',
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/typography.tokens.json'
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/**/*.tokens.json'
	],
	platforms: {
		scss: {
			transforms: ["name/cti/kebab"],
			prefix,
			buildPath,
			files: [{
				destination: '_constants.tokens.scss',
				format: "scss/constants",
				filter: isSource,
				options: {
					selector: '@mixin variables'
				}
			}]
		}
	}
};
