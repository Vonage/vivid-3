import { marks as basicMarks } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/toolbar-items';
import { RTEInstanceImpl } from '../instance';
import {
	featureFacade,
	RTEFeatureImpl,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';

export class RTEItalicFeatureImpl extends RTEFeatureImpl {
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

	override getPlugins(rte: RTEInstanceImpl) {
		return [
			this.contribution(
				keymap({
					'Mod-i': toggleMark(rte.schema.marks.italic),
				})
			),
		];
	}

	override getToolbarItems(rte: RTEInstanceImpl): ToolbarItemContribution[] {
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

export const RTEItalicFeature = featureFacade(RTEItalicFeatureImpl);
