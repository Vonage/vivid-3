import type { ClassDeclaration } from 'ts-morph';
import type { HierarchyEntry } from '../class-hierarchy';
import { getJSDocTags, getTagCommentText } from '../../types/jsdoc';
import { assert } from '../../utils/assert';

export interface ExtractedSlot {
	name: string;
	description?: string;
	dynamicProps?: string;
}

export function extractSlotsFromHierarchy(
	hierarchy: HierarchyEntry[]
): ExtractedSlot[] {
	const slotsByName = new Map<string, ExtractedSlot>();

	for (const slot of hierarchy.flatMap((entry) => [
		...parseSlotTags(entry.classDeclaration),
		...parseDynamicSlotTags(entry.classDeclaration),
	])) {
		slotsByName.set(slot.name, slot);
	}

	return Array.from(slotsByName.values());
}

/**
 * Parse @slot tags: `@slot name - description` or `@slot - description` (default)
 */
const parseSlotTags = (classDecl: ClassDeclaration): ExtractedSlot[] =>
	getJSDocTags(classDecl, 'slot').map((tag) => {
		const text = getTagCommentText(tag);
		// Check for "default" as explicit name
		if (text.startsWith('default')) {
			const match = text.match(/^default(?:\s*-\s*(.*))?$/);
			return {
				name: 'default',
				description: match?.[1]?.trim() || undefined,
			};
		}
		// Check if it starts with "-" or is empty (default slot)
		if (text === '' || text.startsWith('-') || text.startsWith(' -')) {
			return {
				name: 'default',
				description: text.replace(/^\s*-\s*/, '').trim() || undefined,
			};
		}
		// Pattern: name - description
		const match = text.match(/^([\w-]+)(?:\s*-\s*(.*))?$/);
		assert(match, `Invalid @slot format: ${text}`);
		return {
			name: match[1],
			description: match[2]?.trim() || undefined,
		};
	});

/**
 * Parse @dynamicSlot tags: `` @dynamicSlot `Type` name - description ``
 * The type is enclosed in backticks, followed by the slot name and optional description.
 */
const parseDynamicSlotTags = (classDecl: ClassDeclaration): ExtractedSlot[] =>
	getJSDocTags(classDecl, 'dynamicSlot').map((tag) => {
		const text = getTagCommentText(tag);
		// Match pattern: `Type` name - description
		const match = text.match(/^`([^`]+)`\s+([\w-]+)(?:\s*-\s*(.*))?$/);
		assert(match, `Invalid @dynamicSlot format: ${text}`);
		return {
			name: match[2],
			description: match[3]?.trim() || undefined,
			dynamicProps: match[1],
		};
	});
