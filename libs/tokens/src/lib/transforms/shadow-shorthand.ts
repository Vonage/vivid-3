const { transform } = require('style-dictionary');

const { transformer: sizeToPx } = transform['size/px'];

const parseShadowEffects = value =>
	value.map(
		({ x, y, blur, color }) => `drop-shadow(${sizeToPx({ value: x })} ${sizeToPx({ value: y })} ${sizeToPx({ value: blur })} ${color})`
	).join(' ')

module.exports = {
	type: `value`,
	name: `shadow/shorthand`,
	transitive: true,
	matcher: ({ type, attributes: { category }}) => category == 'shadow' && type == 'boxShadow',
	transformer: ({ value }) => Array.isArray(value)? parseShadowEffects(value) : value
};
