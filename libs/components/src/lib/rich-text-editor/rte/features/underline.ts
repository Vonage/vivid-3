import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/ui';
import { RTEInstanceImpl } from '../instance';
import {
	featureFacade,
	RTEFeatureImpl,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';

export class RTEUnderlineFeatureImpl extends RTEFeatureImpl {
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

	override getPlugins(rte: RTEInstanceImpl) {
		return [
			this.contribution(
				keymap({
					'Mod-u': toggleMark(rte.schema.marks.underline),
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

export const RTEUnderlineFeature = featureFacade(RTEUnderlineFeatureImpl);
