import SD from 'style-dictionary';
import { buildPath, prefix } from '../common';
import { isSource } from '../filters';

const transformToCssVariable = (token) =>
	`var(--${token.name}, ${token.value ?? token.$value})`;
const getRunTimeDensity = (token) => {
	const v = token.value ?? token.$value;
	const num = +v;
	return `clamp(${num - 1}, ${transformToCssVariable(token)}, ${num + 2})`;
};

SD.registerTransform({
	type: 'value' as const,
	name: 'type/density',
	transitive: true,
	filter: (token) => token.attributes?.type === 'density',
	transform: getRunTimeDensity,
});

SD.registerTransform({
	type: 'value' as const,
	name: 'css/calc',
	transitive: true,
	filter: isSource,
	transform: function (token) {
		const v = token.value ?? token.$value;
		return `calc(1px * (${v}))`;
	},
});

export default {
	source: [
		'../../node_modules/@vonage/vivid-figma-tokens/data/size.tokens.json',
	],
	include: [
		'../../node_modules/@vonage/vivid-figma-tokens/data/globals/size.tokens.json',
	],
	platforms: {
		scss: {
			transforms: [
				'attribute/cti',
				'name/kebab',
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
