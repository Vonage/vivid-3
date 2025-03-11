export type TypeRef = {
	text: string; // e.g. 'string', "'cta'", 'Date', 'HTMLElement'
	vuePropType: string; // For vue prop type checking, e.g. 'String', 'Number'
	importFromModule?: string;
	resolvedType?: TypeUnion; // When importFromModule is used, this may contain the actual type
};
export type TypeUnion = TypeRef[];

export const isStringLiteral = (typeStr: string) =>
	Boolean(typeStr.match(/^['"].*['"]$/));
export const isNumberLiteral = (typeStr: string) =>
	Boolean(typeStr.match(/^-?[0-9]+$/));
export const isBooleanLiteral = (typeStr: string) =>
	typeStr.match(/^true|false$/);

/// Removes any type parameters, e.g. CustomEvent<number> -> CustomEvent
const stripTypeParameters = (typeStr: string) => typeStr.replace(/<.*>/, '');

const vuePropTypeFor = (typeStr: string) => {
	if (isStringLiteral(typeStr)) {
		return 'String';
	}
	if (isNumberLiteral(typeStr)) {
		return 'Number';
	}
	if (isBooleanLiteral(typeStr)) {
		return 'Boolean';
	}

	const baseType = stripTypeParameters(typeStr);

	switch (baseType) {
		case 'string':
			return 'String';
		case 'number':
			return 'Number';
		case 'boolean':
			return 'Boolean';
		case 'string[]':
			return 'Array';
		case 'object':
			return 'Object';
		case 'Element[]':
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
			throw new Error(`Unknown type ${typeStr}`);
	}
};

const resolveSingleType = (typeStr: string): TypeRef => ({
	text: typeStr,
	vuePropType: vuePropTypeFor(typeStr),
});

/// Splits a type union string along the '|' character, while respecting nested '<' and '>' brackets
const splitTypeUnion = (typeStr: string): string[] => {
	const unionMembers: string[] = [];

	let bracketDepth = 0;
	let currentMember = '';
	for (const char of typeStr) {
		if (char === '<') {
			bracketDepth++;
		} else if (char === '>') {
			bracketDepth--;
		}

		if (char === '|' && bracketDepth === 0) {
			unionMembers.push(currentMember.trim());
			currentMember = '';
		} else {
			currentMember += char;
		}
	}

	unionMembers.push(currentMember.trim());

	return unionMembers;
};

export const makeTypeResolver =
	(typeDefs: Record<string, TypeUnion>) =>
	(typeStr = 'unknown', isAttribute = false): TypeUnion => {
		let unionMembers = splitTypeUnion(typeStr)
			.map((t) => t.trim())
			.filter((t) => t.length > 0);

		if (isAttribute) {
			// Remove null and optional, as all attributes are optional
			unionMembers = unionMembers.filter(
				(t) => t !== 'undefined' && t !== 'null'
			);
		}

		return unionMembers.flatMap((t) => {
			// Replace known type aliases with their underlying values
			// E.g. BadgeShape -> 'rounded' | 'pill'
			if (t in typeDefs) {
				return typeDefs[t];
			}

			return [resolveSingleType(t)];
		});
	};

export const withImportsResolved = (type: TypeRef[]) =>
	type.flatMap((t) => (t.resolvedType ? t.resolvedType : [t]));
