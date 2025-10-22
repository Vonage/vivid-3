import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle, type ToolbarItemSpec } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature } from '../feature';

export class RTEUnderlineFeature extends RTEFeature {
	override getSchema() {
		return [
			{
				schema: {
					marks: {
						underline: {
							parseDOM: [{ tag: 'u' }],
							toDOM() {
								return ['u', 0] as const;
							},
						},
					},
				},
			},
		];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			{
				plugin: keymap({
					'Mod-u': toggleMark(rte.schema.marks.underline),
				}),
			},
		];
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'text-style',
				order: 3,
				render: (ctx) =>
					createMarkToggle(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.underline,
						icon: 'underline-line',
						markType: rte.schema.marks.underline,
					}),
			},
		];
	}
}
