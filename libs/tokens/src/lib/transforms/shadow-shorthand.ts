const { transform } = require('style-dictionary');

const { transformer: colorToRGB } = transform['color/rgb'];
const { transformer: sizeToPx } = transform['size/px'];

const parseShadowEffects = effects =>
	effects.map(
		({ x, y, blur, color }) =>
			`drop-shadow(${sizeToPx({ value: x })} ${sizeToPx({ value: y })} ${sizeToPx({ value: blur })} ${colorToRGB(color)})`
	)
	.join(' ');

module.exports = {
	type: `value`,
	name: `shadow/shorthand`,
	matcher: ({ attributes: { category } }) => category == 'shadow',
	transformer: ({ value }) => parseShadowEffects(value)
};
