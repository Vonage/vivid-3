import {
	featureFacade,
	RteFeatureImpl,
	type ToolbarItemContribution,
} from '../feature';
import { createButton, type UiCtx } from '../utils/ui';

export type RteToolbarButtonAction = { type: 'insert-text'; text: string };

export interface RteToolbarButtonFeatureOptions {
	/**
	 * Aria-label for the button.
	 */
	label: string;
	/**
	 * Icon name for the button.
	 */
	icon: string;
	/**
	 * The action to perform when the button is clicked.
	 */
	action: RteToolbarButtonAction;
	/**
	 * The order of the button in the toolbar. Lower numbers appear first.
	 */
	order?: number;
}

class RteToolbarButtonFeatureImpl extends RteFeatureImpl {
	name: string;

	constructor(
		protected readonly featureId: string,
		protected readonly options: RteToolbarButtonFeatureOptions
	) {
		super();
		this.name = `RteToolbarButtonFeature[${featureId}]`;
	}

	override getToolbarItems(): ToolbarItemContribution[] {
		return [
			this.contribution(
				{
					section: 'insert',
					render: (ctx) =>
						createButton(ctx, {
							label: this.options.label,
							icon: this.options.icon,
							onClick: () => {
								this.executeAction(ctx);
							},
						}),
				},
				2 + (this.options.order ?? 0) / Number.MAX_SAFE_INTEGER
			),
		];
	}

	protected executeAction(ctx: UiCtx) {
		const { action } = this.options;

		switch (action.type) {
			case 'insert-text': {
				const { state, dispatch } = ctx.view;
				const { from, to } = state.selection;
				const tr = state.tr.insertText(action.text, from, to);
				dispatch(tr);
				break;
			}
		}
	}
}

export const RteToolbarButtonFeature = featureFacade(
	RteToolbarButtonFeatureImpl
);
