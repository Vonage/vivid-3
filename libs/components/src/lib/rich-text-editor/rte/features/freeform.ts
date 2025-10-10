import { keymap } from 'prosemirror-keymap';
import type { Command } from 'prosemirror-state';
import { RTEFeature, type SchemaContribution } from '../feature';

export class RTEFreeformStructure extends RTEFeature {
	override getSchema(): SchemaContribution[] {
		return [
			{
				schema: {
					nodes: {
						text: {
							group: 'inline',
						},
						hard_break: {
							inline: true,
							group: 'inline',
							selectable: false,
							parseDOM: [{ tag: 'br' }],
							toDOM() {
								return ['br'];
							},
						},
						doc: { content: 'inline*' },
					},
				},
			},
		];
	}

	override getPlugins() {
		const newLine: Command = (state, dispatch) => {
			dispatch?.(
				state.tr
					.replaceSelectionWith(state.schema.nodes.hard_break.create()!, true)
					.scrollIntoView()
			);
			return true;
		};

		return [
			{
				plugin: keymap({
					Enter: newLine,
				}),
			},
		];
	}
}
