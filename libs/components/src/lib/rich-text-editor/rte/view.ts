import type { RteConfig } from './config';
import type { RteDocument, RteMark, RteNode, RteRegularNode } from './document';
import { impl } from './utils/impl';

// A RteDocument can be converted into an RteView structure for rendering outside the editor.
// The RichTextView component can render RteViews.
// In an RteView, marks are represented as separate nodes. The resulting tree should be equivalent to the HTML structure
// produced by the editor for the same document.
// Fragments are represented explicitly to allow rendering them as children of a custom rendered node or mark.

export type RteView = (
	| { type: 'node'; node: RteDocument | RteNode; children: RteView }
	| { type: 'mark'; mark: RteMark; children: RteView }
	| { type: 'fragment'; content: RteView[] }
) & {
	[impl]: RteViewCtx;
};

export type RteViewCtx = {
	config: RteConfig;
	options: RteViewOptions;
};

export type RteViewOptions = {
	/// Specify this function to customize how nodes or marks are rendered.
	renderChildView?: (view: RteView & { type: 'node' | 'mark' }) =>
		| {
				/// Element to render for this node or mark.
				dom: HTMLElement;
				/// Element to which rendered children will be appended to. Defaults to `dom`.
				contentDom?: HTMLElement;
		  }
		// TODO: Support rendering via Vue scoped slots when returning true
		/// Use default rendering
		| false;
};

/**
 * Converts an RteDocument to an RteView tree for rendering outside the editor.
 * The logic is adapted from ProseMirror's DOM serialization to ensure the resulting structure
 * matches the editor's HTML structure.
 */
export const convertToView = (doc: RteDocument, ctx: RteViewCtx): RteView => {
	const schema = ctx.config[impl].schema;

	const getMarkRank = (mark: RteMark): number =>
		(schema.marks[mark.type] as unknown as { rank: number }).rank;

	const marksEqual = (a: RteMark, b: RteMark): boolean => {
		if (a.type !== b.type) return false;
		const attrsA = a.attrs;
		const attrsB = b.attrs;
		if (attrsA === attrsB) return true;
		/* v8 ignore next -- not currently reachable since all attrs are required @preserve */
		if (!attrsA || !attrsB) return false;
		const keysA = Object.keys(attrsA);
		const keysB = Object.keys(attrsB);
		/* v8 ignore next -- not currently reachable since all attrs are required @preserve */
		if (keysA.length !== keysB.length) return false;
		for (const key of keysA) {
			if (attrsA[key] !== attrsB[key]) return false;
		}
		return true;
	};

	const convertFragment = (nodes: RteNode[]): RteView => {
		const result: RteView[] = [];
		const active: RteMark[] = [];
		const activeContents: RteView[][] = [result];

		for (const node of nodes) {
			// Sort marks by schema rank (lowest first = outermost)
			const nodeMarks = [...(node.marks ?? [])].sort(
				(a, b) => getMarkRank(a) - getMarkRank(b)
			);

			// Find how many marks we can keep from the active stack
			let keep = 0;
			let rendered = 0;
			while (keep < active.length && rendered < nodeMarks.length) {
				if (!marksEqual(active[keep], nodeMarks[rendered])) break;
				keep++;
				rendered++;
			}

			// Close marks we can't keep
			while (active.length > keep) {
				active.pop();
				activeContents.pop();
			}

			// Open new marks
			while (rendered < nodeMarks.length) {
				const mark = nodeMarks[rendered];
				const markContent: RteView[] = [];
				activeContents[activeContents.length - 1].push({
					type: 'mark',
					mark,
					children: { type: 'fragment', content: markContent, [impl]: ctx },
					[impl]: ctx,
				});
				active.push(mark);
				activeContents.push(markContent);
				rendered++;
			}

			// Add node view to current level
			activeContents[activeContents.length - 1].push({
				type: 'node',
				node,
				children: convertFragment((node as RteRegularNode).content ?? []),
				[impl]: ctx,
			});
		}

		return { type: 'fragment', content: result, [impl]: ctx };
	};

	return {
		type: 'node',
		node: doc,
		children: convertFragment(doc.content),
		[impl]: ctx,
	};
};
