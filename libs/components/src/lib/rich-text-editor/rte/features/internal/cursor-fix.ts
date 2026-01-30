import type { MarkSpec, ResolvedPos } from 'prosemirror-model';
import {
	type EditorState,
	Plugin,
	type TextSelection,
} from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import {
	featureFacade,
	type PluginContribution,
	RteFeatureImpl,
} from '../../feature';
import type { RteInstanceImpl } from '../../instance';

// Fixes cursor display issues by adding a zero-width space decoration before the cursor when needed.

/// Optionally, any CSS properties to apply.
export type CursorFix = Record<string, string>;

export type CursorFixFn = (
	$cursor: ResolvedPos,
	state: EditorState
) => CursorFix | null;

/**
 * Mark specs can define cursor fixes.
 */
export interface CursorFixMarkSpec extends MarkSpec {
	cursorFix?: CursorFixFn;
}

/**
 * When the cursor is positioned after an inline atom node at the end of a line,
 * browsers may display the cursor inside the atom.
 */
const atomCursorFix: CursorFixFn = ($cursor) => {
	const isAtEndOfParent = $cursor.parentOffset === $cursor.parent.content.size;
	if (!isAtEndOfParent) {
		return null;
	}

	const nodeBefore = $cursor.nodeBefore;
	if (
		nodeBefore &&
		nodeBefore.isInline &&
		nodeBefore.isAtom &&
		!nodeBefore.isText
	) {
		return {};
	}

	return null;
};

export class RteCursorFixFeatureImpl extends RteFeatureImpl {
	name = 'RteCursorFix';

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
		const cursorFixes: CursorFixFn[] = [atomCursorFix];
		for (const markType of Object.values(rte.schema.marks)) {
			const spec = markType.spec;
			if (spec.cursorFix) {
				cursorFixes.push(spec.cursorFix);
			}
		}

		return [
			this.contribution(
				new Plugin({
					props: {
						decorations: (state) => {
							const { $cursor } = state.selection as TextSelection;
							if (!$cursor) {
								return null;
							}

							let cursorFix: CursorFix | null = null;
							for (const fn of cursorFixes) {
								const result = fn($cursor, state);
								if (result) {
									Object.assign((cursorFix ??= {}), result);
								}
							}

							if (!cursorFix) {
								return null;
							}

							return DecorationSet.create(state.doc, [
								Decoration.widget(
									$cursor.pos,
									() => {
										const span = document.createElement('span');
										span.textContent = '\u200b'; // zero-width space
										for (const [prop, value] of Object.entries(cursorFix)) {
											span.style.setProperty(prop, value);
										}
										return span;
									},
									{ side: -1 } // Before the cursor
								),
							]);
						},
					},
				})
			),
		];
	}
}

export const RteCursorFixFeature = featureFacade(RteCursorFixFeatureImpl);
