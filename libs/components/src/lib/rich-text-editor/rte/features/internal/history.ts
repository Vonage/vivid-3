import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { createButton, type ToolbarItemSpec } from '../../utils/toolbar-items';
import { RTEFeature } from '../../feature';

export class RTEHistoryFeature extends RTEFeature {
	override getPlugins() {
		return [
			{ plugin: history() },
			{
				plugin: keymap({
					'Mod-z': undo,
					'Ctrl-y': redo,
					'Cmd-Z': redo,
				}),
			},
		];
	}

	override getToolbarItems(): ToolbarItemSpec[] {
		return [
			{
				section: 'history',
				order: 1,
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
			{
				section: 'history',
				order: 2,
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
		];
	}
}
