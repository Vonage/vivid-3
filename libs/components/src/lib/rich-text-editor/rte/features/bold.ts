import { marks as basicMarks } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle, type ToolbarItemSpec } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature } from '../feature';

export class RTEBoldFeature extends RTEFeature {
	override getSchema() {
		return [
			{
				schema: {
					marks: {
						bold: basicMarks.strong,
					},
				},
			},
		];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			{
				plugin: keymap({
					'Mod-b': toggleMark(rte.schema.marks.bold),
				}),
			},
		];
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'text-style',
				order: 1,
				render: (ctx) =>
					createMarkToggle(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.bold,
						icon: 'bold-line',
						markType: rte.schema.marks.bold,
					}),
			},
		];
	}
}
