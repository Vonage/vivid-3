const SD = require('style-dictionary');

import { prefix, buildPath, selector } from '../common';
import {  isSource } from '../filters';


export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/size.tokens.json',
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/size.tokens.json'
	],
	platforms: {

		scss: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'resolveMath', 'public/cssReferences'],
			prefix,
			buildPath,
			files: [{
				destination: '_size.variables.scss',
				format: 'scss/variables',
				filter: isSource,
			}],
		}
	}
};
