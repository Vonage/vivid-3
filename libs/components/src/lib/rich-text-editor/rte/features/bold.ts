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

export class RTEBoldFeature extends RTEFeature {
	protected name = 'RTEBoldFeature';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					bold: basicMarks.strong,
				},
			}),
		];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			this.contribution(
				keymap({
					'Mod-b': toggleMark(rte.schema.marks.bold),
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
							label: () => ctx.rte.getLocale().richTextEditor.bold,
							icon: 'bold-line',
							markType: rte.schema.marks.bold,
						}),
				},
				1
			),
		];
	}
}
