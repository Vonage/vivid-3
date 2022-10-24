const SD = require('style-dictionary');
import { prefix, buildPath } from './common/config';

import fontWeight from '../transforms/font-weight';
import fontSize from '../transforms/font-size';
import typographyShorthand from '../transforms/typography-shorthand';
import { isTypography } from '../filters';


SD.registerTransform(fontWeight);
SD.registerTransform(fontSize);
SD.registerTransform(typographyShorthand);

export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/**/*.tokens.json'
	],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath', 'type/fontWeight', 'type/fontSize', 'typography/shorthand'],
			prefix,
			buildPath,
			files: [{
				destination: '_variables.mixin.scss',
				format: "css/themeableVariables",
				filter: token => isTypography(token) || token.public,
				options: {
					selector: '@mixin variables'
				}
			}]
		}
	}
};
