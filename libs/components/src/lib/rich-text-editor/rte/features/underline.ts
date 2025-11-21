import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import {
	RTEFeature,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';

export class RTEUnderlineFeature extends RTEFeature {
	protected name = 'RTEUnderlineFeature';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					underline: {
						parseDOM: [{ tag: 'u' }],
						toDOM() {
							return ['u', 0];
						},
					},
				},
			}),
		];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			this.contribution(
				keymap({
					'Mod-u': toggleMark(rte.schema.marks.underline),
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
							label: () => ctx.rte.getLocale().richTextEditor.underline,
							icon: 'underline-line',
							markType: rte.schema.marks.underline,
						}),
				},
				3
			),
		];
	}
}
