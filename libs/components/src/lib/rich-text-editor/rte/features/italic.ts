import { marks as basicMarks } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle, type ToolbarItemSpec } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature } from '../feature';

export class RTEItalicFeature extends RTEFeature {
	override getSchema() {
		const schema = {
			marks: {
				italic: basicMarks.em,
			},
		};

		return [{ schema }];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			{
				plugin: keymap({
					'Mod-i': toggleMark(rte.schema.marks.italic),
				}),
			},
		];
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'text-style',
				order: 2,
				render: (ctx) =>
					createMarkToggle(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.italic,
						icon: 'italic-line',
						markType: rte.schema.marks.italic,
					}),
			},
		];
	}
}
