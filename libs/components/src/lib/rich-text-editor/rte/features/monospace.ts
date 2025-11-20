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
import monospaceCss from './monospace.style.scss?inline';

export class RTEMonospaceFeatureImpl extends RTEFeatureImpl {
	protected name = 'RTEMonospaceFeature';

	override getStyles() {
		return [this.contribution(monospaceCss)];
	}

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					monospace: {
						parseDOM: [{ tag: 'tt' }, { tag: 'code' }],
						toDOM() {
							return ['tt', 0];
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
					// There is no common shortcut for monospace
					// Using Mod + Shift + m to avoid common existing keybindings on Mod + m
					'Mod-M': toggleMark(rte.schema.marks.monospace),
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
							label: () => ctx.rte.getLocale().richTextEditor.monospace,
							icon: 'monospace-line',
							markType: rte.schema.marks.monospace,
						}),
				},
				5
			),
		];
	}
}

export const RTEMonospaceFeature = featureFacade(RTEMonospaceFeatureImpl);
