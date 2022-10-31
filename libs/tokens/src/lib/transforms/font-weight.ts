import type { Named, Transform } from "style-dictionary";


// due to figma api typography limitations,
// we patch font weight to output font weight
// as a number and stretch keyword.
// once figma api supports variable fonts, we can refactor this
const fontWeightMap = {
	'Wide Medium': '500 condensed',
	'Regular': '400 ultra-condensed',
	'SemiBold': '600 ultra-condensed'
};

export default {
	type: 'value',
	name: 'type/fontWeight',
	transitive: true,
	matcher: token => token.type === 'fontWeights',
	transformer: ({ value }) => fontWeightMap[value]
} as Named<Transform>;

