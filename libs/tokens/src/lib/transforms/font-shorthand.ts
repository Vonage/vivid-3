// const { transform } = require('style-dictionary');

// const { transformer: colorToRGB } = transform['color/rgb'];
// const { transformer: sizeToPx } = transform['size/px'];

const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

const parseFontProps = ({ fontFamily, fontWeight, lineHeight, fontSize, fontStretch }) =>
	`${fontWeight} ${fontStretch} ${fontSize}/${lineHeight} ${fontFamily}`;

module.exports = {
	type: `value`,
	name: `font/shorthand`,
	transitive: true,
	matcher: ({ type, attributes: { category }}) => category == 'font' && type == 'typography',
	transformer: ({ value }) =>
	isObject(value)
		? parseFontProps(value)
		: value
};
