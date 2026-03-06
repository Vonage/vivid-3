import type { Transform } from 'style-dictionary/types';
import StyleDictionary from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';

const sizeToPxTransform = StyleDictionary.hooks.transforms[transforms.sizePx];

/** Build a minimal token and run the built-in size/px transform for a single value. */
const toPx = (value: unknown, options: { usesDtcg?: boolean }) => {
	const token = {
		value,
		$value: value,
		name: '',
		path: [],
		original: { value },
		filePath: '',
		isSource: false,
	};
	return sizeToPxTransform.transform(token, {}, options);
};

const parseShadowEffects = (value, options: { usesDtcg?: boolean }) =>
	value
		.map(
			({ x, y, blur, color }) =>
				`drop-shadow(${toPx(x, options)} ${toPx(y, options)} ${toPx(
					blur,
					options
				)} ${color})`
		)
		.join(' ');

export default {
	type: 'value',
	name: 'shadow/shorthand',
	transitive: true,
	filter: (token) => {
		const category = token.attributes?.category ?? token.$attributes?.category;
		const type = token.type ?? token.$type;
		return !!category?.includes('shadow') && type === 'boxShadow';
	},
	transform: (token, config, options) =>
		Array.isArray(token.value ?? token.$value)
			? parseShadowEffects(token.value ?? token.$value, options ?? {})
			: (token.value ?? token.$value),
} as Transform;
