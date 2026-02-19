import { type MarkType, type Node } from 'prosemirror-model';
import { type Command, EditorState, SelectionRange } from 'prosemirror-state';
import { RemoveMarkStep } from 'prosemirror-transform';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';
import { createButton, createDiv, createSingleSlot } from '../utils/ui';
import { escapeCssProperty } from '../utils/sanitization';

// markApplies function adapted from prosemirror-commands
function markApplies(
	doc: Node,
	ranges: readonly SelectionRange[],
	type: MarkType
) {
	for (let i = 0; i < ranges.length; i++) {
		const { $from, $to } = ranges[i];
		let can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
		doc.nodesBetween($from.pos, $to.pos, (node) => {
			if (can) return false;
			can = node.inlineContent && node.type.allowsMarkType(type);
			return true;
		});
		if (can) return true;
	}
	return false;
}

export interface TextColorOnBlock {
	node: string;
	defaultColor?: string;
}

export interface RteTextColorPickerConfig {
	onBlocks?: TextColorOnBlock[];
}

const mixedColor = Symbol('mixedColor');
type MixedColor = typeof mixedColor;

type SelectionColor =
	| string // only this defined color
	| null; // mixed or no defined colors

export class RteTextColorPickerFeatureImpl extends RteFeatureImpl {
	name = 'RteTextColorPicker';
	defaultColorForNode?: Record<string, string | null>;

	constructor(protected readonly config?: RteTextColorPickerConfig) {
		super();
		if (config?.onBlocks) {
			this.defaultColorForNode = {};
			for (const block of config.onBlocks) {
				this.defaultColorForNode[block.node] = block.defaultColor ?? null;
			}
		}
	}

	override getTextblockMarks() {
		if (this.config?.onBlocks) {
			return this.config.onBlocks.map((block) =>
				this.contribution({
					markName: 'textColor',
					onNodeName: block.node,
				})
			);
		}
		return [
			this.contribution({
				markName: 'textColor',
			}),
		];
	}

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					textColor: {
						attrs: {
							color: { validate: 'string' },
						},
						parseDOM: [
							// Browsers normalise CSS style (e.g. hex to rgb()), so we store original value in data attribute
							{
								tag: 'span[data-text-color]',
								getAttrs: (dom) => {
									return { color: dom.getAttribute('data-text-color') };
								},
							},
							{
								style: 'color',
								getAttrs: (value) => {
									return { color: value };
								},
							},
						],
						toDOM(node) {
							const { color } = node.attrs;
							return [
								'span',
								{
									style: `color: ${escapeCssProperty(color)};`,
									'data-text-color': color,
								},
								0,
							];
						},
						inclusive: true,
					},
				},
			}),
		];
	}

	override getToolbarItems(): ToolbarItemContribution[] {
		return [
			this.contribution(
				{
					section: 'text-style',
					render: (ctx) => {
						const tooltipButton = createButton(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.textColor,
							disabled: () => !this.setColor('any')(ctx.view.state),
							icon: 'textcolor-line',
						});
						const button = tooltipButton.firstElementChild!;
						return createDiv(ctx, {
							children: [
								tooltipButton,
								createSingleSlot(ctx, {
									name: 'text-color-picker',
									assignedProps: {
										anchor: button,
										value: () => this.getSelectionColor(ctx.view.state) || '',
									},
									assignedEvents: {
										change: (e: Event) => {
											const value = (e.currentTarget as any).value as string;
											this.setColor(value)(ctx.view.state, ctx.view.dispatch);
										},
									},
								}),
							],
						});
					},
				},
				6
			),
		];
	}

	/// Determine the color of the current selection or null if colors are mixed
	getSelectionColor(state: EditorState): SelectionColor {
		const { selection } = state;
		const { textColor } = state.schema.marks;
		const { from, to, $from, empty } = selection;

		if (empty) {
			const defaultColor =
				this.defaultColorForNode?.[$from.parent.type.name] ?? null;
			return (
				textColor.isInSet(state.storedMarks || $from.marks())?.attrs.color ??
				defaultColor
			);
		}

		// Determine color of text in selection
		let selectionColor: SelectionColor | MixedColor = null;
		const observeColor = (observedColor?: typeof selectionColor) => {
			if (selectionColor === null) {
				selectionColor = observedColor ?? null;
			} else if (observedColor !== selectionColor) {
				selectionColor = mixedColor;
			}
		};
		state.doc.nodesBetween(from, to, (node, pos, parent) => {
			if (selectionColor === mixedColor) return false;
			if (!node.isLeaf) {
				if (node.type.allowsMarkType(textColor) && node.childCount === 0) {
					// Observe default color for empty nodes
					observeColor(this.defaultColorForNode?.[node.type.name]);
				}
				return true;
			}

			observeColor(
				textColor.isInSet(node.marks)?.attrs.color ??
					(parent && this.defaultColorForNode?.[parent.type.name])
			);
			return true;
		});

		return selectionColor === mixedColor ? null : selectionColor;
	}

	setColor(color: string): Command {
		return (state, dispatch) => {
			const { textColor } = state.schema.marks;
			const { from, to, empty, $from } = state.selection;

			if (!markApplies(state.doc, state.selection.ranges, textColor)) {
				return false;
			}

			const tr = state.tr;

			if (empty) {
				const storedMarks = state.storedMarks || [];
				const newStoredMarks = storedMarks.filter((m) => m.type !== textColor);
				const defaultColor = this.defaultColorForNode?.[$from.parent.type.name];
				if (color !== defaultColor) {
					newStoredMarks.push(textColor.create({ color }));
				}
				tr.setStoredMarks(newStoredMarks);
			} else {
				tr.addMark(from, to, textColor.create({ color }));
				// Remove textColor marks that are the same as the default color
				tr.doc.nodesBetween(from, to, (node, pos, parent) => {
					if (!node.isInline) return;
					const mark = textColor.isInSet(node.marks);
					const defaultColor = this.defaultColorForNode?.[parent!.type.name];
					if (mark && mark.attrs.color === defaultColor) {
						tr.step(new RemoveMarkStep(pos, pos + node.nodeSize, mark));
					}
				});
			}
			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}
}

export const RteTextColorPickerFeature = featureFacade(
	RteTextColorPickerFeatureImpl
);
