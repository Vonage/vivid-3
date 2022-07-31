const { transform } = require('style-dictionary');

const { transformer: colorToRGB } = transform['color/rgb'];
const { transformer: sizeToPx } = transform['size/px'];

const parseShadowEffects = ({ value }) =>
	Array.isArray(value)
		? value.map(
				({ x, y, blur, color }) =>
					`drop-shadow(${sizeToPx({ value: x })} ${sizeToPx({ value: y })} ${sizeToPx({ value: blur })} ${colorToRGB(color)})`
			).join(' ')
		: value


module.exports = {
	type: `value`,
	name: `shadow/shorthand`,
	transitive: true,
	matcher: ({ type, attibutes: { category }}) => category == 'shadow' && type == 'boxShadow',
	transformer: parseShadowEffects
};
