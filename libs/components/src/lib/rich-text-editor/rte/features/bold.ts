import { marks as basicMarks } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/ui';
import { RteInstanceImpl } from '../instance';
import {
	featureFacade,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';
import { RteTextStyleFeatureImpl } from './internal/text-style';

export class RteBoldFeatureImpl extends RteTextStyleFeatureImpl {
	protected name = 'RteBoldFeature';
	protected markName = 'bold';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					bold: basicMarks.strong,
				},
			}),
		];
	}

	override getPlugins(rte: RteInstanceImpl) {
		return [
			this.contribution(
				keymap({
					'Mod-b': toggleMark(rte.schema.marks.bold),
				})
			),
		];
	}

	override getToolbarItems(rte: RteInstanceImpl): ToolbarItemContribution[] {
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

export const RteBoldFeature = featureFacade(RteBoldFeatureImpl);
