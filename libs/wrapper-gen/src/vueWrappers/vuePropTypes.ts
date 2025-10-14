import {
	isBooleanLiteral,
	isNumberLiteral,
	isStringLiteral,
	parseTypeStr,
	TypeRef,
	TypeStr,
} from '../common/types';

/// Removes any type parameters, e.g. CustomEvent<number> -> CustomEvent
const stripTypeParameters = (typeStr: TypeRef) => typeStr.replace(/<.*>/, '');

const toVuePropType = (type: TypeRef) => {
	if (isStringLiteral(type)) {
		return 'String';
	}
	if (isNumberLiteral(type)) {
		return 'Number';
	}
	if (isBooleanLiteral(type)) {
		return 'Boolean';
	}

	const baseType = stripTypeParameters(type);

	switch (baseType) {
		case 'string':
			return 'String';
		case 'number':
			return 'Number';
		case 'boolean':
			return 'Boolean';
		case 'object':
			return 'Object';
		case 'string[]':
		case 'Element[]':
		case 'any[]':
		case 'Array':
			return 'Array';
		case 'Date':
		case 'HTMLElement':
		case 'Event':
		case 'MouseEvent':
		case 'FocusEvent':
		case 'KeyboardEvent':
		case 'InputEvent':
		case 'CustomEvent':
			return baseType;
		case 'any':
		case 'unknown':
		case 'undefined':
		case 'null':
		case 'void':
			return 'null as unknown'; // will pass any validation
		default:
			throw new Error(`Unknown type ${type}`);
	}
};

const unique = <T>(arr: T[]) => Array.from(new Set(arr));

/**
 * Converts types to the corresponding runtime values for Vue's prop validation:
 * https://vuejs.org/guide/components/props#prop-validation
 */
export const vuePropTypes = (types: TypeStr) =>
	unique(parseTypeStr(types).map(toVuePropType));
