
const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

// due to figma api typography limitations,
// we patch font weight to output font weight
// as a number and stretch keyword.
// once figma api supports variable fonts, we can refactor this
const fontWeightMap = new Map([
	['Wide Medium', '500 condensed'],
	['Regular', '400 ultra-condensed'],
	['SemiBold', '600 ultra-condensed']
]);

const parseFontProps = ({ fontFamily, fontWeight, lineHeight, fontSize }) =>
	`${fontWeightMap.get(fontWeight)} ${fontSize}/${lineHeight} ${fontFamily}`;

export const fontShorthand = {
	type: `value`,
	name: `font/shorthand`,
	transitive: true,
	matcher: ({ type, attributes: { category }}) => category == 'font' && type == 'typography',
	transformer: ({ value }) =>
	isObject(value)
		? parseFontProps(value)
		: value
} as any;
