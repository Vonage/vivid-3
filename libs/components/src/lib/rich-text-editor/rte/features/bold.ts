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

export class RTEBoldFeatureImpl extends RTEFeatureImpl {
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

	override getPlugins(rte: RTEInstanceImpl) {
		return [
			this.contribution(
				keymap({
					'Mod-b': toggleMark(rte.schema.marks.bold),
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

export const RTEBoldFeature = featureFacade(RTEBoldFeatureImpl);
