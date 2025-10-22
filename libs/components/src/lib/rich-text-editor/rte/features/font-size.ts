import { Mark, type MarkSpec } from 'prosemirror-model';
import { type Command, EditorState, Plugin } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Decoration, DecorationSet } from 'prosemirror-view';
import {
	createButton,
	createMenu,
	createMenuItem,
	type ToolbarItemSpec,
} from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { type PluginContribution, RTEFeature } from '../feature';

export interface FontSizeSpec {
	text: string;
	value: string;
	size: string; // CSS font-size value
}

export class RTEFontSizeFeature extends RTEFeature {
	fontSizes: FontSizeSpec[];

	constructor() {
		super();

		// TODO: make configurable
		const fontSizes: FontSizeSpec[] = [
			{ text: 'Extra Large', value: 'extra-large', size: '24px' },
			{ text: 'Large', value: 'large', size: '18px' },
			{ text: 'Normal', value: 'normal', size: '14px' },
			{ text: 'Small', value: 'small', size: '12px' },
		];

		this.fontSizes = fontSizes;
	}

	override getSchema() {
		const fontSizeMark: MarkSpec = {
			attrs: { size: { default: 'normal' } },
			parseDOM: [
				{
					tag: "span[style*='font-size']",
					getAttrs: (node: HTMLElement) => {
						const style = node.getAttribute('style');

						const fontSize = style!
							.match(/font-size:\s*([^;]+)/)?.[1]
							?.trim() as string;

						const size = this.fontSizes.find(
							(fs) => fs.size === fontSize
						)?.value;
						if (size) return { size };
						return false;
					},
				},
			],
			toDOM: (mark: Mark) => {
				const size = mark.attrs.size;
				const fontSize = this.fontSizes.find((fs) => fs.value === size)?.size;
				return ['span', { style: `font-size: ${fontSize};` }, 0] as const;
			},
			fontSizes: this.fontSizes,
		};

		return [
			{
				schema: {
					marks: {
						fontSize: fontSizeMark,
					},
				},
			},
		];
	}

	override getPlugins(rte: RTEInstance): PluginContribution[] {
		return [
			{
				/**
				 * Plugin to adapt the caret height based on a stored fontSize mark.
				 */
				plugin: new Plugin({
					props: {
						decorations: (state) => {
							const { $from } = state.selection;
							const storedMark = state.storedMarks?.find(
								(m) => m.type === rte.schema.marks.fontSize
							);
							const storedMarkSize =
								storedMark?.attrs.size ??
								(state.storedMarks?.length === 0 ? 'normal' : null);
							if (storedMarkSize) {
								const fontSize = this.fontSizes.find(
									(fs) => fs.value === storedMarkSize
								)!.size;
								// Create a zero-width span with the correct font size in before the cursor
								// FIXME: This seems to only work and the end of a node
								return DecorationSet.create(state.doc, [
									Decoration.widget(
										$from.pos,
										() => {
											const span = document.createElement('span');
											span.style.fontSize = fontSize;
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
				}),
			},
			{
				plugin: keymap({
					'Mod-Shift-.': this.adjustFontSize(-1),
					'Mod-Shift-,': this.adjustFontSize(1),
				}),
			},
		];
	}

	getFontSizeFromSelection(state: EditorState): string {
		const { from, to, $from, empty } = state.selection;
		if (empty) {
			const canHaveFontSize = toggleMark(state.schema.marks.fontSize)(state);
			const defaultSize = canHaveFontSize ? 'normal' : 'mixed';
			return (
				state.schema.marks.fontSize.isInSet(state.storedMarks || $from.marks())
					?.attrs.size ?? defaultSize
			);
		}

		let size: string | null = null;
		state.doc.nodesBetween(from, to, (node) => {
			if (size === 'mixed') {
				return false;
			}
			if (!node.isLeaf) {
				if (!node.type.allowsMarkType(state.schema.marks.fontSize)) {
					size = 'mixed';
				}
				return true;
			}

			const nodeFontSize =
				state.schema.marks.fontSize.isInSet(node.marks)?.attrs.size ?? 'normal';

			if (size === null) {
				size = nodeFontSize;
			} else if (nodeFontSize !== size) {
				size = 'mixed';
			}
			return true;
		});
		return size ?? 'normal';
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
				if (size !== 'normal') {
					newStoredMarks.push(
						state.schema.marks.fontSize.create({
							size,
						})
					);
				}
				tr.setStoredMarks(newStoredMarks);
			} else {
				if (size === 'normal') {
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
			if (currentSize === 'mixed') {
				return false;
			}
			const currentIndex = this.fontSizes.findIndex(
				(fs) => fs.value === currentSize
			);
			const nextIndex = currentIndex + adjustment;
			if (nextIndex < 0 || nextIndex >= this.fontSizes.length) {
				return false;
			}
			return this.setFontSize(this.fontSizes[nextIndex].value)(state, dispatch);
		};
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'font',
				order: 1,
				render: (ctx) =>
					createMenu(ctx, {
						label: () => rte.getLocale().richTextEditor.textSize,
						trigger: createButton(ctx, {
							label: () => rte.getLocale().richTextEditor.textSize,
							icon: 'text-size-line',
						}),
						children: this.fontSizes.map((fs) =>
							createMenuItem(ctx, {
								text: fs.text,
								checked: () =>
									this.getFontSizeFromSelection(ctx.view.state) === fs.value,
								disabled: () => !this.setFontSize(fs.value)(ctx.view.state),
								onSelect: () => {
									const { state, dispatch } = ctx.view;
									this.setFontSize(fs.value)(state, dispatch);
								},
							})
						),
					}),
			},
		];
	}
}
