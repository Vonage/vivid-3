import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { createButton } from '../../utils/ui';
import { RTEFeatureImpl, type ToolbarItemContribution } from '../../feature';

export class RTEHistoryFeatureImpl extends RTEFeatureImpl {
	protected name = 'RTEHistoryFeature';

	override getPlugins() {
		return [
			this.contribution(history()),
			this.contribution(
				keymap({
					'Mod-z': undo,
					'Ctrl-y': redo,
					'Cmd-Z': redo,
				})
			),
		];
	}

	override getToolbarItems(): ToolbarItemContribution[] {
		return [
			this.contribution(
				{
					section: 'history',
					render: (ctx) =>
						createButton(ctx, {
							label: (ctx) => ctx.rte.getLocale().richTextEditor.undo,
							icon: 'undo-line',
							disabled: (ctx) => !undo(ctx.view.state),
							onClick: () => {
								const { state, dispatch } = ctx.view;
								undo(state, dispatch);
							},
						}),
				},
				1
			),
			this.contribution(
				{
					section: 'history',
					render: (ctx) =>
						createButton(ctx, {
							label: (ctx) => ctx.rte.getLocale().richTextEditor.redo,
							icon: 'redo-line',
							disabled: (ctx) => !redo(ctx.view.state),
							onClick: () => {
								const { state, dispatch } = ctx.view;
								redo(state, dispatch);
							},
						}),
				},
				2
			),
		];
	}
}
