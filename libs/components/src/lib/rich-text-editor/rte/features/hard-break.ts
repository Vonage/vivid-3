import { type Command } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import {
	featureFacade,
	type PluginContribution,
	RteFeatureImpl,
	type SchemaContribution,
} from '../feature';
import type { RteInstanceImpl } from '../instance';

export class RteHardBreakFeatureImpl extends RteFeatureImpl {
	name = 'RteHardBreakFeature';

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				nodes: {
					hardBreak: {
						inline: true,
						group: 'inline',
						selectable: false,
						parseDOM: [{ tag: 'br' }],
						toDOM() {
							return ['br'];
						},
					},
				},
			}),
		];
	}

	override getPlugins(_rte: RteInstanceImpl): PluginContribution[] {
		const forceBreak: Command = (state, dispatch) => {
			dispatch?.(
				state.tr
					.replaceSelectionWith(state.schema.nodes.hardBreak.create()!, true)
					.scrollIntoView()
			);
			return true;
		};

		const keyBindings: {
			[key: string]: Command;
		} = {
			'Shift-Enter': forceBreak,
		};

		return [this.contribution(keymap(keyBindings))];
	}
}

export const RteHardBreakFeature = featureFacade(RteHardBreakFeatureImpl);
