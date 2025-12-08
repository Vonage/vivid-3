import { createOption, createSelect } from '../utils/ui';
import {
	featureFacade,
	RteFeatureImpl,
	type ToolbarItemContribution,
} from '../feature';
import type { RteInstanceImpl } from '../instance';
import { RteBasicTextBlocksImpl } from './internal/basic-text-blocks';

export interface TextBlockOption {
	node: string;
	label: string;
}

export type RteTextBlockPickerConfig = {
	options: TextBlockOption[];
};

export class RteTextBlockPickerFeatureImpl extends RteFeatureImpl {
	protected name = 'RteTextBlockPickerFeature';

	constructor(protected config: RteTextBlockPickerConfig) {
		super();
	}

	override getToolbarItems(rte: RteInstanceImpl): ToolbarItemContribution[] {
		const blocks = rte.getFeature(RteBasicTextBlocksImpl);

		return [
			this.contribution(
				{
					section: 'font',
					render: (ctx) => {
						return createSelect(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.paragraphStyles,
							value: (ctx) => blocks.getCurrentBlockType(ctx.view.state) ?? '',
							onSelect: (value: string) => {
								const { state, dispatch } = ctx.view;
								blocks.setBlockType(rte, value)(state, dispatch);
							},
							children: this.config.options.map((opt) =>
								createOption(ctx, {
									text: opt.label,
									value: opt.node,
									disabled: () =>
										!blocks.setBlockType(rte, opt.node)(ctx.view.state),
								})
							),
						});
					},
				},
				1
			),
		];
	}
}

export const RteTextBlockPickerFeature = featureFacade(
	RteTextBlockPickerFeatureImpl
);
