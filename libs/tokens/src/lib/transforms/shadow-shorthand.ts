const { transform } = require('style-dictionary');
const Color = require('tinycolor2');

const { transformer: sizeToPx } = transform['size/px'];

const parseShadowEffects = value =>
	value.map(
		({ x, y, blur, color }) => {
			if (color.startsWith('rgba')) {
				const start = color.indexOf('(') + 1;
				const end = color.indexOf(')') + 1;
				const rgb = Color(color.slice(start, end));
				const alpha = Number(color.slice(end + 1, -1));
				rgb.setAlpha(alpha);
				color = rgb.toRgbString();
			}
			return `drop-shadow(${sizeToPx({ value: x })} ${sizeToPx({ value: y })} ${sizeToPx({ value: blur })} ${color})`
		}
	)
		.join(' ')

module.exports = {
	type: `value`,
	name: `shadow/shorthand`,
	transitive: true,
	matcher: ({ type, attributes: { category }}) => category == 'shadow' && type == 'boxShadow',
	transformer: ({ value }) => Array.isArray(value)? parseShadowEffects(value) : value
};
