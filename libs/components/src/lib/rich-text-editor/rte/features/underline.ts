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

export class RteUnderlineFeatureImpl extends RteTextStyleFeatureImpl {
	name = 'RteUnderlineFeature';
	protected markName = 'underline';

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

	override getPlugins(rte: RteInstanceImpl) {
		return [
			this.contribution(
				keymap({
					'Mod-u': toggleMark(rte.schema.marks.underline),
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

export const RteUnderlineFeature = featureFacade(RteUnderlineFeatureImpl);
