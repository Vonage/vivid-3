import {
	parseTypeStr,
	toTypeStr,
	TypeRef,
	TypeStr,
} from '@repo/metadata-extractor/metadata/type-str';

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
