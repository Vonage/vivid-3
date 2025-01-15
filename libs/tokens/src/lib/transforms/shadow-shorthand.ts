import { type Named, type Transform, transform } from 'style-dictionary';

const { transformer: sizeToPx } = transform['size/px'];

const generateToken = (value) => ({
	value,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
});

const parseShadowEffects = (value) =>
	value
		.map(
			({ x, y, blur, color }) =>
				`drop-shadow(${sizeToPx(generateToken(x), {})} ${sizeToPx(
					generateToken(y),
					{}
				)} ${sizeToPx(generateToken(blur), {})} ${color})`
		)
		.join(' ');

export default {
	type: 'value',
	name: 'shadow/shorthand',
	transitive: true,
	matcher: ({ type, attributes: { category } }) =>
		!!category?.includes('shadow') && type == 'boxShadow',
	transformer: ({ value }) =>
		Array.isArray(value) ? parseShadowEffects(value) : value,
} as Named<Transform>;
