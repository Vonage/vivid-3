import type { Named, Transform } from 'style-dictionary';
import { isTypography } from '../filters';

/**
 * Helper: Transforms typography object to typography shorthand
 * This currently works fine if every value uses an alias, but if any one of these use a raw value, it will not be transformed.
 * If you'd like to output all typography values, you'd rather need to return the typography properties itself
 */
const transformTypography = ({
	fontWeight,
	fontSize,
	lineHeight,
	fontFamily,
}) => `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;

/**
 * Transform typography shorthands for css variables
 */
export default {
	name: 'typography/shorthand',
	type: 'value',
	transitive: true,
	matcher: isTypography,
	transformer: (token) => transformTypography(token.value),
} as Named<Transform>;
