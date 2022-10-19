import type { Named, Transform } from "style-dictionary";


// due to figma api typography limitations,
// we patch font weight to output font weight
// as a number and stretch keyword.
// once figma api supports variable fonts, we can refactor this
const fontWeightMap = new Map([
	['Wide Medium', '500 condensed'],
	['Regular', '400 ultra-condensed'],
	['SemiBold', '600 ultra-condensed']
]);

const parseFontProps = ({ value: { fontFamily, fontWeight, lineHeight, fontSize } }) => `${fontWeightMap.get(fontWeight)} ${fontSize}/${lineHeight} ${fontFamily}`;

export const fontShorthand: Named<Transform> = {
	type: `value`,
	name: `font/shorthand`,
	transitive: true,
	matcher: ({ type, attributes: { category }}) => category == 'font' && type == 'typography',
	transformer: parseFontProps
};
