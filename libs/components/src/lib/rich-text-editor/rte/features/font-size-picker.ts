import { Mark } from 'prosemirror-model';
import { type Command, EditorState, Plugin } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { RemoveMarkStep } from 'prosemirror-transform';
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

export interface FontSizeOnBlock {
	node: string;
	defaultSize?: string;
}

export type RteFontSizePickerConfig = {
	options: FontSizeOption[];
	onBlocks?: FontSizeOnBlock[];
};

const mixedFontSize = Symbol('mixedFontSize');
type MixedFontSize = typeof mixedFontSize;

type SelectionFontSize =
	| string // only this defined size
	| MixedFontSize // mixed sizes
	| null; // no defined sizes

export class RteFontSizePickerFeatureImpl extends RteFeatureImpl {
	protected name = 'RteFontSizePickerFeature';

	fontSizes: FontSizeOption[];
	defaultFontSizeForNode?: Record<string, string | null>;

	constructor(protected config: RteFontSizePickerConfig) {
		super();

		this.fontSizes = config.options;
		if (config.onBlocks) {
			this.defaultFontSizeForNode = {};
			for (const block of config.onBlocks) {
				this.defaultFontSizeForNode[block.node] = block.defaultSize ?? null;
			}
		}
	}

	override getTextblockMarks() {
		if (this.config?.onBlocks) {
			return this.config.onBlocks.map((block) =>
				this.contribution({
					markName: 'fontSize',
					onNodeName: block.node,
				})
			);
		}
		return [
			this.contribution({
				markName: 'fontSize',
			}),
		];
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
									? this.defaultFontSizeForNode?.[$from.parent.type.name]
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

	getFontSizeFromSelection(state: EditorState): SelectionFontSize {
		const { from, to, $from, empty } = state.selection;
		const { fontSize } = state.schema.marks;

		if (empty) {
			const defaultSize =
				this.defaultFontSizeForNode?.[$from.parent.type.name] ?? null;
			return (
				fontSize.isInSet(state.storedMarks || $from.marks())?.attrs.size ??
				defaultSize
			);
		}

		let size: SelectionFontSize = null;
		const observeSize = (observedSize?: typeof size) => {
			if (size === null) {
				size = observedSize ?? null;
			} else if (observedSize !== size) {
				size = mixedFontSize;
			}
		};
		state.doc.nodesBetween(from, to, (node, _, parent) => {
			if (size === mixedFontSize) {
				return false;
			}
			if (!node.isLeaf) {
				if (node.type.allowsMarkType(fontSize) && node.childCount === 0) {
					// Observe default size for empty nodes
					observeSize(this.defaultFontSizeForNode?.[node.type.name]);
				}
				return true;
			}

			observeSize(
				fontSize.isInSet(node.marks)?.attrs.size ??
					(parent && this.defaultFontSizeForNode?.[parent.type.name])
			);
			return true;
		});
		return size;
	}

	setFontSize(size: string): Command {
		return (state, dispatch) => {
			const { from, to, empty, $from } = state.selection;
			const { fontSize } = state.schema.marks;

			if (!toggleMark(fontSize, { size })(state)) {
				return false; // Cannot apply the mark
			}

			const tr = state.tr;
			if (empty) {
				const storedMarks = state.storedMarks || [];
				const newStoredMarks = storedMarks.filter((m) => m.type !== fontSize);
				const defaultSize =
					this.defaultFontSizeForNode?.[$from.parent.type.name];
				if (size !== defaultSize) {
					newStoredMarks.push(
						fontSize.create({
							size,
						})
					);
				}
				tr.setStoredMarks(newStoredMarks);
			} else {
				tr.addMark(
					from,
					to,
					fontSize.create({
						size,
					})
				);
				// Remove fontSize marks that are the same as the default size
				tr.doc.nodesBetween(from, to, (node, pos, parent) => {
					if (!node.isInline) return;
					const mark = fontSize.isInSet(node.marks);
					const defaultSize = this.defaultFontSizeForNode?.[parent!.type.name];
					if (mark && mark.attrs.size === defaultSize) {
						tr.step(new RemoveMarkStep(pos, pos + node.nodeSize, mark));
					}
				});
			}
			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}

	adjustFontSize(adjustment: -1 | 1): Command {
		return (state, dispatch) => {
			const currentSize = this.getFontSizeFromSelection(state);
			if (currentSize === null || currentSize === mixedFontSize) {
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

export const RteFontSizePickerFeature = featureFacade(
	RteFontSizePickerFeatureImpl
);
