export type TypeStr = string; // e.g. "string | 'cta' | Date | HTMLElement"
export type TypeRef = string; // e.g. 'string', "'cta'", 'Date', 'HTMLElement'
export type TypeUnion = TypeRef[];

/// Splits a type union string along the '|' character, while respecting nested '<' and '>' brackets
export const parseTypeStr = (typeStr: TypeStr): TypeUnion => {
	const unionMembers: TypeUnion = [];

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

	return unionMembers.filter((m) => m.length > 0);
};

export const toTypeStr = (type: TypeUnion): TypeStr => type.join(' | ');

export const isStringLiteral = (typeRef: TypeRef) =>
	Boolean(typeRef.match(/^['"].*['"]$/));
export const isNumberLiteral = (typeRef: TypeRef) =>
	Boolean(typeRef.match(/^-?[0-9]+$/));
export const isBooleanLiteral = (typeRef: TypeRef) =>
	Boolean(typeRef.match(/^true|false$/));

export type TypeResolver = (typeStr: TypeStr, isProp?: boolean) => TypeStr;
export const makeTypeResolver =
	(typeDefs: Record<string, TypeStr>) =>
	(typeStr = 'unknown', isProp = false): TypeStr => {
		let unionMembers = parseTypeStr(typeStr);

		if (isProp) {
			// Remove null and optional, as all props are optional
			unionMembers = unionMembers.filter(
				(t) => t !== 'undefined' && t !== 'null'
			);
		}

		return toTypeStr(
			unionMembers.flatMap((t) => {
				// Replace known type aliases with their underlying values
				// E.g. BadgeShape -> 'rounded' | 'pill'
				if (t in typeDefs) {
					return parseTypeStr(typeDefs[t]);
				}

				return [t];
			})
		);
	};
