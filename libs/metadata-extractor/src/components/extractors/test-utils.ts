import type { HierarchyEntry } from '../class-hierarchy';
import { getJSDocTags, getTagCommentText } from '../../types/jsdoc';
import type { ClassDeclaration } from 'ts-morph';
import type { VividTestUtilsManifest } from '../../metadata/format';

export interface ExtractedTestUtilAnnotation {
	name: string;
	args: string[];
}

export function extractTestUtilsFromHierarchy(
	hierarchy: HierarchyEntry[]
): VividTestUtilsManifest {
	const selectors = new Map<string, ExtractedTestUtilAnnotation>();
	const actions = new Map<string, ExtractedTestUtilAnnotation>();
	const queries = new Map<string, ExtractedTestUtilAnnotation>();
	const refs = new Map<string, ExtractedTestUtilAnnotation>();

	for (const entry of hierarchy) {
		const classDecl = entry.classDeclaration;

		for (const s of parseTestUtilTag(classDecl, 'testSelector')) {
			selectors.set(s.name, s);
		}
		for (const a of parseTestUtilTag(classDecl, 'testAction')) {
			actions.set(a.name, a);
		}
		for (const q of parseTestUtilTag(classDecl, 'testQuery')) {
			queries.set(q.name, q);
		}
		for (const r of parseTestUtilTag(classDecl, 'testRef')) {
			refs.set(r.name, r);
		}
	}

	return {
		selectors: Array.from(selectors.values()),
		actions: Array.from(actions.values()),
		queries: Array.from(queries.values()),
		refs: Array.from(refs.values()),
	};
}

/**
 * Parse test utility tags (@testSelector, @testAction, @testQuery, @testRef).
 *
 * Format: `@tagName name arg1 arg2 ...`
 * Result: `{ name, args: [arg1, arg2, ...] }`
 */
export function parseTestUtilTag(
	classDecl: ClassDeclaration,
	tagName: string
): ExtractedTestUtilAnnotation[] {
	const tags = getJSDocTags(classDecl, tagName);
	return tags.map((tag) => {
		const text = getTagCommentText(tag);
		const tokens = tokenizeWithBackticks(text.trim());
		const [name = '', ...args] = tokens;
		return { name, args };
	});
}

/**
 * Tokenizes a string by whitespace, treating backtick-enclosed content as single tokens.
 * e.g. "a `b c` d" -> ["a", "b c", "d"]
 */
function tokenizeWithBackticks(input: string): string[] {
	const tokens: string[] = [];
	let current = '';
	let inBackticks = false;

	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (char === '`') {
			inBackticks = !inBackticks;
		} else if (char === ' ' && !inBackticks) {
			if (current.trim()) {
				tokens.push(current.trim());
				current = '';
			}
		} else {
			current += char;
		}
	}

	if (current.trim()) {
		tokens.push(current.trim());
	}

	return tokens;
}
