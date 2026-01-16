import { inputRules, undoInputRule } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import {
	contributionPriority,
	type PluginContribution,
	RteFeatureImpl,
	sortedContributions,
} from '../../feature';
import type { RteInstanceImpl } from '../../instance';

/**
 * Aggregates all input rules from other features and provides the undoInputRule keybind (Backspace).
 */
export class RteInputRulesFeatureImpl extends RteFeatureImpl {
	name = 'RteInputRulesFeature';

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
		const rules = sortedContributions(
			rte.config.features.flatMap((f) => f.getInputRules(rte))
		);

		if (rules.length === 0) {
			return [];
		}

		return [
			this.contribution(inputRules({ rules })),
			this.contribution(
				keymap({
					Backspace: undoInputRule,
				}),
				// Use high priority so undoInputRule is checked before other Backspace handlers
				contributionPriority.high
			),
		];
	}
}
