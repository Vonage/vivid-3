import { keymap } from 'prosemirror-keymap';
import { toggleMark } from 'prosemirror-commands';
import { createMarkToggle, type ToolbarItemSpec } from '../utils/toolbar-items';
import { RTEInstance } from '../instance';
import { RTEFeature, type StyleContribution } from '../feature';
import monospaceCss from './monospace.style.scss?inline';

export class RTEMonospaceFeature extends RTEFeature {
	override getStyles(): StyleContribution[] {
		return [{ css: monospaceCss }];
	}

	override getSchema() {
		const schema = {
			marks: {
				monospace: {
					parseDOM: [{ tag: 'tt' }, { tag: 'code' }],
					toDOM() {
						return ['tt', 0] as const;
					},
				},
			},
		};

		return [{ schema }];
	}

	override getPlugins(rte: RTEInstance) {
		return [
			{
				plugin: keymap({
					// There is no common shortcut for monospace
					// Using Mod + Shift + m to avoid common existing keybindings on Mod + m
					'Mod-M': toggleMark(rte.schema.marks.monospace),
				}),
			},
		];
	}

	override getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [
			{
				section: 'text-style',
				order: 5,
				render: (ctx) =>
					createMarkToggle(ctx, {
						label: () => ctx.rte.getLocale().richTextEditor.monospace,
						icon: 'monospace-line',
						markType: rte.schema.marks.monospace,
					}),
			},
		];
	}
}
