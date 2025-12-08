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

export class RteItalicFeatureImpl extends RteTextStyleFeatureImpl {
	protected name = 'RteItalicFeature';
	protected markName = 'italic';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					italic: basicMarks.em,
				},
			}),
		];
	}

	override getPlugins(rte: RteInstanceImpl) {
		return [
			this.contribution(
				keymap({
					'Mod-i': toggleMark(rte.schema.marks.italic),
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

export const RteItalicFeature = featureFacade(RteItalicFeatureImpl);
