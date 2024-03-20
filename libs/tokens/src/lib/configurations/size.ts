const SD = require('style-dictionary');

import { prefix, buildPath } from '../common';
import { isSource } from '../filters';

const transformToCssVariable = ({ name, value }) => `var(--${name}, ${value})`;
const getRunTimeDensity = (token) =>
	`clamp(${+token.value - 1}, ${transformToCssVariable(token)}, ${
		+token.value + 2
	})`;

SD.registerTransform({
	type: 'value',
	name: 'type/density',
	transitive: true,
	matcher: (token) => token.attributes.type === 'density',
	transformer: getRunTimeDensity,
});

SD.registerTransform({
	type: 'value',
	name: 'css/calc',
	transitive: true,
	matcher: isSource,
	transformer: function (token) {
		return `calc(1px * (${token.value}))`;
	},
});

export default {
	source: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/size.tokens.json',
	],
	include: [
		'../../../../node_modules/@vonage/vivid-figma-tokens/data/globals/size.tokens.json',
	],
	platforms: {
		scss: {
			transforms: [
				'attribute/cti',
				'name/cti/kebab',
				'resolveMath',
				'type/density',
				'css/calc',
			],
			prefix,
			buildPath,
			files: [
				{
					destination: '_size.variables.scss',
					format: 'scss/variables',
					filter: isSource,
				},
			],
		},
	},
};
