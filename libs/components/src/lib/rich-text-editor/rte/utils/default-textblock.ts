import type { ContentMatch } from 'prosemirror-model';

export function defaultTextblockForMatch(match: ContentMatch) {
	for (let i = 0; i < match.edgeCount; i++) {
		const { type } = match.edge(i);
		/* v8 ignore if -- @preserve It's currently not possible to exercise this code in our RTE */
		if (type.isTextblock && !type.hasRequiredAttrs()) return type;
	}
	/* v8 ignore next 1 -- @preserve*/
	throw new Error('No default textblock found.');
}
