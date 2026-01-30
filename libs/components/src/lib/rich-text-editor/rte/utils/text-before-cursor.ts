import type { ResolvedPos } from 'prosemirror-model';

/**
 * Get the text content before the cursor position in the current text block.
 */
export const textBeforeCursor = ($cursor: ResolvedPos) =>
	$cursor.parent.textBetween(
		0,
		$cursor.parentOffset,
		undefined,
		'\ufffc' // object replacement char, to avoid matching across non-text nodes
	);
