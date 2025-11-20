import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import {
	RTEFeature,
	type SchemaContribution,
	type ToolbarItemContribution,
} from '../feature';
import monospaceCss from './monospace.style.scss?inline';

export class RTEMonospaceFeature extends RTEFeature {
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

	override getPlugins(rte: RTEInstance) {
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

	override getToolbarItems(rte: RTEInstance): ToolbarItemContribution[] {
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
