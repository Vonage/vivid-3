import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle, type ToolbarItemSpec } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature } from '../feature';

export class RTEStrikethroughFeature extends RTEFeature {
	override getSchema() {
		const schema = {
			marks: {
				strikethrough: {
					parseDOM: [{ tag: 's' }, { tag: 'del' }],
					toDOM() {
						return ['s', 0] as const;
					},
				},
			},
		};
		return [{ schema }];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			{
				plugin: keymap({
					'Alt-Shift-5': toggleMark(rte.schema.marks.strikethrough),
					'Cmd-Shift-X': toggleMark(rte.schema.marks.strikethrough),
				}),
			},
		];
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'text-style',
				order: 4,
				render: (ctx) =>
					createMarkToggle(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.strikethrough,
						icon: 'strikethrough-line',
						markType: rte.schema.marks.strikethrough,
					}),
			},
		];
	}
}
