import { Mark } from 'prosemirror-model';
import { type Command, EditorState, Plugin } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { createButton, createMenu, createMenuItem } from '../utils/ui';
import { RteInstanceImpl } from '../instance';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';

export interface FontSizeOption {
	size: string; // CSS font-size value
	label: string;
}

export type RteFontSizeFeatureConfig = {
	options: FontSizeOption[];
	defaultSize: string;
};

const mixedFontSize = Symbol('mixedFontSize');
type MixedFontSize = typeof mixedFontSize;

export class RteFontSizeFeatureImpl extends RteFeatureImpl {
	protected name = 'RteFontSizeFeature';

	fontSizes: FontSizeOption[];

	constructor(protected config: RteFontSizeFeatureConfig) {
		super();

		this.fontSizes = config.options;
	}

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					fontSize: {
						attrs: { size: { validate: 'string' } },
						parseDOM: [
							{
								tag: "span[style*='font-size']",
								getAttrs: (node: HTMLElement) => {
									const style = node.getAttribute('style');

									const size = style!
										.match(/font-size:\s*([^;]+)/)?.[1]
										?.trim() as string;

									if (size) return { size };
									return false;
								},
							},
						],
						toDOM: (mark: Mark) => {
							return [
								'span',
								{ style: `font-size: ${mark.attrs.size};` },
								0,
							] as const;
						},
						fontSizes: this.fontSizes,
					},
				},
			}),
		];
	}

	override getPlugins(rte: RteInstanceImpl) {
		return [
			/**
			 * Plugin to adapt the caret height based on a stored fontSize mark.
			 */
			this.contribution(
				new Plugin({
					props: {
						decorations: (state) => {
							const { $from } = state.selection;
							const storedMark = state.storedMarks?.find(
								(m) => m.type === rte.schema.marks.fontSize
							);
							const storedMarkSize =
								storedMark?.attrs.size ??
								(state.storedMarks?.length === 0
									? this.config.defaultSize
									: null);
							if (storedMarkSize) {
								// Create a zero-width span with the correct font size in before the cursor
								// FIXME: This seems to only work and the end of a node
								return DecorationSet.create(state.doc, [
									Decoration.widget(
										$from.pos,
										() => {
											const span = document.createElement('span');
											span.style.fontSize = storedMarkSize;
											span.innerText = '\u200b'; // zero-width space
											return span;
										},
										{ side: -1 }
									),
								]);
							}
							return null;
						},
					},
				})
			),
			this.contribution(
				keymap({
					'Mod-Shift-.': this.adjustFontSize(-1),
					'Mod-Shift-,': this.adjustFontSize(1),
				})
			),
		];
	}

	override getToolbarItems(rte: RteInstanceImpl): ToolbarItemContribution[] {
		return [
			this.contribution(
				{
					section: 'font',
					render: (ctx) =>
						createMenu(ctx, {
							label: () => rte.getLocale().richTextEditor.textSize,
							trigger: createButton(ctx, {
								label: () => rte.getLocale().richTextEditor.textSize,
								icon: 'text-size-line',
							}),
							children: this.fontSizes.map((fs) =>
								createMenuItem(ctx, {
									text: fs.label,
									checked: () =>
										this.getFontSizeFromSelection(ctx.view.state) === fs.size,
									disabled: () => !this.setFontSize(fs.size)(ctx.view.state),
									onSelect: () => {
										const { state, dispatch } = ctx.view;
										this.setFontSize(fs.size)(state, dispatch);
									},
								})
							),
						}),
				},
				2
			),
		];
	}

	getFontSizeFromSelection(state: EditorState): string | MixedFontSize {
		const { from, to, $from, empty } = state.selection;
		if (empty) {
			const canHaveFontSize = toggleMark(state.schema.marks.fontSize)(state);
			const defaultSize = canHaveFontSize
				? this.config.defaultSize
				: mixedFontSize;
			return (
				state.schema.marks.fontSize.isInSet(state.storedMarks || $from.marks())
					?.attrs.size ?? defaultSize
			);
		}

		let size: string | MixedFontSize | null = null;
		state.doc.nodesBetween(from, to, (node) => {
			if (size === mixedFontSize) {
				return false;
			}
			if (!node.isLeaf) {
				if (!node.type.allowsMarkType(state.schema.marks.fontSize)) {
					size = mixedFontSize;
				}
				return true;
			}

			const nodeFontSize =
				state.schema.marks.fontSize.isInSet(node.marks)?.attrs.size ??
				this.config.defaultSize;

			if (size === null) {
				size = nodeFontSize;
			} else if (nodeFontSize !== size) {
				size = mixedFontSize;
			}
			return true;
		});
		return size ?? this.config.defaultSize;
	}

	setFontSize(size: string): Command {
		return (state, dispatch) => {
			const { from, to, empty } = state.selection;

			if (!toggleMark(state.schema.marks.fontSize, { size })(state)) {
				return false; // Cannot apply the mark
			}

			const tr = state.tr;
			if (empty) {
				const storedMarks = state.storedMarks || [];
				const newStoredMarks = storedMarks.filter(
					(m) => m.type !== state.schema.marks.fontSize
				);
				if (size !== this.config.defaultSize) {
					newStoredMarks.push(
						state.schema.marks.fontSize.create({
							size,
						})
					);
				}
				tr.setStoredMarks(newStoredMarks);
			} else {
				if (size === this.config.defaultSize) {
					tr.removeMark(from, to, state.schema.marks.fontSize);
				} else {
					tr.addMark(
						from,
						to,
						state.schema.marks.fontSize.create({
							size,
						})
					);
				}
			}
			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}

	adjustFontSize(adjustment: -1 | 1): Command {
		return (state, dispatch) => {
			const currentSize = this.getFontSizeFromSelection(state);
			if (currentSize === mixedFontSize) {
				return false;
			}
			const currentIndex = this.fontSizes.findIndex(
				(fs) => fs.size === currentSize
			);
			const nextIndex = currentIndex + adjustment;
			if (nextIndex < 0 || nextIndex >= this.fontSizes.length) {
				return false;
			}
			return this.setFontSize(this.fontSizes[nextIndex].size)(state, dispatch);
		};
	}
}

export const RteFontSizeFeature = featureFacade(RteFontSizeFeatureImpl);
