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
import monospaceCss from './monospace.style.scss?inline';

export class RteMonospaceFeatureImpl extends RteFeatureImpl {
	protected name = 'RteMonospaceFeature';

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

	override getPlugins(rte: RteInstanceImpl) {
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

	override getToolbarItems(rte: RteInstanceImpl): ToolbarItemContribution[] {
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

export const RteMonospaceFeature = featureFacade(RteMonospaceFeatureImpl);
