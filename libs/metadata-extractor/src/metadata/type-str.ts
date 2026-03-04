export type TypeStr = string; // e.g. "string | 'cta' | Date | HTMLElement | @vonage/vivid#ButtonSize"
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

export type Import = {
	name: string;
	fromModule: string;
};

export interface ParsedTypeStr {
	/** The type string with import references replaced by bare names */
	typeStr: string;
	imports: Import[];
}

const IMPORT_REF_RE = /([@\w-\/]*)#(\w*)(<[^>]*>)?/g;

export function parseTypeImports(typeStr: string): ParsedTypeStr {
	const imports: Import[] = [];

	const cleaned = typeStr.replace(
		IMPORT_REF_RE,
		(_match, fromModule: string, name: string, typeParams = '') => {
			if (fromModule !== '@vonage/vivid') {
				return 'any';
			}
			imports.push({ name, fromModule });
			return `${name}${typeParams}`;
		}
	);

	return { typeStr: cleaned, imports };
}
