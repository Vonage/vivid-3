import { type Command, EditorState } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import {
	createButton,
	createDiv,
	createMenu,
	type ToolbarItemSpec,
} from '../utils/toolbar-items';
import { type PluginContribution, RTEFeature } from '../feature';
import type { TextblockAttrSpec } from '../utils/textblock-attrs';

type Alignment = 'left' | 'center' | 'right';

const alignments = [
	{
		value: 'left',
		icon: 'align-left-line',
		label: 'left',
	},
	{
		value: 'center',
		icon: 'align-center-line',
		label: 'center',
	},
	{
		value: 'right',
		icon: 'align-right-line',
		label: 'right',
	},
] as const;

export class RTEAlignmentFeature extends RTEFeature {
	override getTextblockAttrs(): TextblockAttrSpec[] {
		return [
			{
				name: 'textAlign',
				default: 'left',
				fromDOM(dom: HTMLElement) {
					return dom.style.textAlign || 'left';
				},
				toStyles(node) {
					return [`text-align: ${node.attrs.textAlign}`];
				},
			},
		];
	}

	override getPlugins(): PluginContribution[] {
		return [
			{
				plugin: keymap({
					'Mod-L': this.setAlignment('left'),
					'Mod-E': this.setAlignment('center'),
					'Mod-R': this.setAlignment('right'),
				}),
			},
		];
	}

	getAlignmentFromSelection(state: EditorState): Alignment | 'mixed' | null {
		const { selection } = state;
		const { from, to } = selection;
		let align: Alignment | 'mixed' | null = null;
		state.doc.nodesBetween(from, to, (node) => {
			if (align === 'mixed') return;

			if (node.type.isTextblock) {
				if (!align) {
					align = node.attrs.textAlign;
				} else if (align !== node.attrs.textAlign) {
					align = 'mixed';
				}
			}
		});
		return align;
	}

	setAlignment(align: Alignment): Command {
		return (state, dispatch) => {
			const { tr, selection } = state;
			const { from, to } = selection;
			state.doc.nodesBetween(from, to, (node, pos) => {
				if (node.type.isTextblock) {
					tr.setNodeMarkup(pos, node.type, { ...node.attrs, textAlign: align });
				}
			});
			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}

	override getToolbarItems(): ToolbarItemSpec[] {
		return [
			{
				section: 'textblock',
				order: 3,
				render: (ctx) =>
					createMenu(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.alignment,
						trigger: createButton(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.alignment,
							icon: () => {
								const currentAlign = this.getAlignmentFromSelection(
									ctx.view.state
								);
								return (
									alignments.find((a) => a.value === currentAlign)?.icon ??
									'align-left-line'
								);
							},
						}),
						children: [
							createDiv(ctx, {
								className: 'toolbar-menu-buttons',
								children: alignments.map((align, index) =>
									createButton(ctx, {
										icon: align.icon,
										label: () =>
											ctx.rte.getLocale().richTextEditor.alignments[
												align.label
											],
										slot: 'header',
										noTooltip: true,
										autofocus: () => {
											const currentAlign = this.getAlignmentFromSelection(
												ctx.view.state
											);
											if (
												(currentAlign === 'mixed' || currentAlign === null) &&
												index === 0
											) {
												return true;
											}
											return align.value === currentAlign;
										},
										active: () =>
											this.getAlignmentFromSelection(ctx.view.state) ===
											align.value,
										disabled: () =>
											this.getAlignmentFromSelection(ctx.view.state) === null,
										onClick: () => {
											const { state, dispatch } = ctx.view;
											this.setAlignment(align.value)(state, dispatch);
										},
									})
								),
							}),
						],
					}),
			},
		];
	}
}
