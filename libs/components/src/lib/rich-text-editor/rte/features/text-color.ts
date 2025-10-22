import {
	type Mark,
	type MarkSpec,
	type MarkType,
	type Node,
} from 'prosemirror-model';
import { type Command, EditorState, SelectionRange } from 'prosemirror-state';
import { RTEFeature } from '../feature';
import {
	createButton,
	createDiv,
	createSingleSlot,
	type ToolbarItemSpec,
} from '../utils/toolbar-items';

// markApplies function taken from prosemirror-commands
function markApplies(
	doc: Node,
	ranges: readonly SelectionRange[],
	type: MarkType,
	enterAtoms: boolean
) {
	for (let i = 0; i < ranges.length; i++) {
		const { $from, $to } = ranges[i];
		let can =
			$from.depth == 0
				? doc.inlineContent && doc.type.allowsMarkType(type)
				: false;
		doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
			if (
				can ||
				(!enterAtoms &&
					node.isAtom &&
					node.isInline &&
					pos >= $from.pos &&
					pos + node.nodeSize <= $to.pos)
			)
				return false;
			can = node.inlineContent && node.type.allowsMarkType(type);
			return true;
		});
		if (can) return true;
	}
	return false;
}

export interface TextColorFeatureConfig {
	defaultColor: string;
}

export class RTETextColorFeature extends RTEFeature {
	constructor(protected readonly config: TextColorFeatureConfig) {
		super();
	}

	override getSchema() {
		const textColorMark: MarkSpec = {
			attrs: {
				color: { validate: 'string' },
			},
			parseDOM: [
				// Browser normalise CSS style (e.g. hex to rgb()), so we store original value in data attribute
				{
					tag: 'span[data-text-color]',
					getAttrs: (dom) => {
						const el = dom as HTMLElement;
						const value = el.getAttribute('data-text-color');
						if (!value) return false;
						return { color: value };
					},
				},
				{
					style: 'color',
					getAttrs: (value) => {
						if (typeof value !== 'string' || !value) return false;
						return { color: value };
					},
				},
			],
			toDOM(node) {
				const { color } = node.attrs;
				return [
					'span',
					{
						style: `color: ${color}`,
						'data-text-color': color,
					},
					0,
				];
			},
			inclusive: true,
		};

		return [
			{
				schema: {
					marks: {
						textColor: textColorMark,
					},
				},
			},
		];
	}

	override getToolbarItems(): ToolbarItemSpec[] {
		return [
			{
				section: 'text-style',
				order: 6,
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
		];
	}

	/// Determine the color of the current selection or null if colors are mixed
	getSelectionColor(state: EditorState): string | null {
		const { selection } = state;
		const { textColor } = state.schema.marks;
		const getColor = (marks: readonly Mark[]) =>
			textColor.isInSet(marks)?.attrs.color ?? this.config.defaultColor;

		if (selection.empty) {
			return getColor(state.storedMarks ?? selection.$head.marks());
		}

		// Determine color of text in selection
		const { from, to } = selection;
		const mixed = Symbol('mixed');
		let selectionColor: null | string | typeof mixed = null;
		state.doc.nodesBetween(from, to, (node, pos) => {
			if (selectionColor === mixed) return false;
			if (!node.isText) return true;

			const color = getColor(node.marks);
			if (!selectionColor) {
				selectionColor = color;
			} else if (color !== selectionColor) {
				selectionColor = mixed;
			}
			return true;
		});

		return selectionColor === mixed
			? null
			: selectionColor ?? this.config.defaultColor;
	}

	setColor(color: string): Command {
		return (state, dispatch) => {
			const { textColor } = state.schema.marks;
			const { from, to, empty } = state.selection;

			if (!markApplies(state.doc, state.selection.ranges, textColor, true)) {
				return false;
			}

			const tr = state.tr;

			// Remove mark
			if (color === this.config.defaultColor) {
				if (empty) {
					tr.removeStoredMark(textColor);
				} else {
					tr.removeMark(from, to, textColor);
				}
				dispatch?.(tr.scrollIntoView());
				return true;
			}

			// Set or update mark
			const mark = textColor.create({ color });
			if (empty) {
				tr.addStoredMark(mark);
			} else {
				tr.addMark(from, to, mark);
			}
			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}
}
