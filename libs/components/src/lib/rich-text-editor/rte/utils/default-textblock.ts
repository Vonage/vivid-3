import type { ContentMatch } from 'prosemirror-model';

export function defaultTextblockForMatch(match: ContentMatch) {
	for (let i = 0; i < match.edgeCount; i++) {
		const { type } = match.edge(i);
		if (type.isTextblock && !type.hasRequiredAttrs()) return type;
		/* v8 ignore next 3 -- @preserve */
	}
	throw new Error('No default textblock found.');
}
