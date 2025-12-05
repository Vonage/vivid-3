import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/ui';
import { RteInstanceImpl } from '../instance';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';

export class RteStrikethroughFeatureImpl extends RteFeatureImpl {
	protected name = 'RteStrikethroughFeature';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					strikethrough: {
						parseDOM: [{ tag: 's' }, { tag: 'del' }],
						toDOM() {
							return ['s', 0];
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
					'Alt-Shift-5': toggleMark(rte.schema.marks.strikethrough),
					'Cmd-Shift-X': toggleMark(rte.schema.marks.strikethrough),
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
							label: () => ctx.rte.getLocale().richTextEditor.strikethrough,
							icon: 'strikethrough-line',
							markType: rte.schema.marks.strikethrough,
						}),
				},
				4
			),
		];
	}
}

export const RteStrikethroughFeature = featureFacade(
	RteStrikethroughFeatureImpl
);
