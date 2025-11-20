import { marks as basicMarks } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import {
	RTEFeature,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';

export class RTEItalicFeature extends RTEFeature {
	protected name = 'RTEItalicFeature';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					italic: basicMarks.em,
				},
			}),
		];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			this.contribution(
				keymap({
					'Mod-i': toggleMark(rte.schema.marks.italic),
				})
			),
		];
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemContribution[] {
		return [
			this.contribution(
				{
					section: 'text-style',
					render: (ctx) =>
						createMarkToggle(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.italic,
							icon: 'italic-line',
							markType: rte.schema.marks.italic,
						}),
				},
				2
			),
		];
	}
}
