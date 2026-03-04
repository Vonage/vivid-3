import type { ClassDeclaration } from 'ts-morph';
import type { HierarchyEntry } from '../class-hierarchy';
import { getJSDocTags, getTagCommentText } from '../../types/jsdoc';
import { assert } from '../../utils/assert';

export interface ExtractedEvent {
	name: string;
	description?: string;
	type: string;
}

export function extractEventsFromHierarchy(
	hierarchy: HierarchyEntry[]
): ExtractedEvent[] {
	const eventsByName = new Map<string, ExtractedEvent>();

	for (const event of hierarchy.flatMap((entry) =>
		parseEventTags(entry.classDeclaration)
	)) {
		eventsByName.set(event.name, event);
	}

	return Array.from(eventsByName.values());
}

const parseEventTags = (classDecl: ClassDeclaration): ExtractedEvent[] =>
	getJSDocTags(classDecl, 'event').map(getTagCommentText).map(parseEventText);

function parseEventText(text: string): ExtractedEvent {
	assert(text.startsWith('{'), `@event tag missing {Type} braces: ${text}`);

	// Extract type with brace-depth counting
	let depth = 0;
	let typeEnd = -1;
	for (let i = 0; i < text.length; i++) {
		if (text[i] === '{') depth++;
		else if (text[i] === '}') {
			depth--;
			if (depth === 0) {
				typeEnd = i;
				break;
			}
		}
	}

	assert(typeEnd >= 0, `@event tag has unmatched braces: ${text}`);

	const type = text.substring(1, typeEnd); // Content between outer { }
	const rest = text.substring(typeEnd + 1).trim(); // After closing }

	// rest should be: name - description (or just name)
	const nameMatch = rest.match(/^([\w-:]+)(?:\s*-\s*(.*))?$/);
	assert(
		nameMatch,
		`@event tag has invalid name/description after type: ${text}`
	);

	return {
		name: nameMatch[1],
		description: nameMatch[2]?.trim() || undefined,
		type,
	};
}
