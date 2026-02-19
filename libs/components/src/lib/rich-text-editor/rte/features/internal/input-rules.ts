import {
	type InputRule,
	inputRules,
	undoInputRule,
} from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import {
	type EditorState,
	TextSelection,
	type Transaction,
} from 'prosemirror-state';
import {
	contributionPriority,
	type PluginContribution,
	RteFeatureImpl,
	sortedContributions,
} from '../../feature';
import type { RteInstanceImpl } from '../../instance';
import { textBeforeCursor } from '../../utils/text-before-cursor';

export interface InputRuleSpec {
	rule: InputRule;
	// Since input rules can't trigger on Enter key, allow providing an additional handler for that
	enterHandler?: {
		regex: RegExp;
		handler: (
			state: EditorState,
			match: RegExpMatchArray,
			start: number,
			end: number
		) => Transaction | null;
	};
}

/**
 * Aggregates all input rules from other features.
 */
export class RteInputRulesFeatureImpl extends RteFeatureImpl {
	name = 'RteInputRulesFeature';

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
		const ruleSpecs = sortedContributions(
			rte.config.features.flatMap((f) => f.getInputRules(rte))
		);

		if (ruleSpecs.length === 0) {
			return [];
		}

		const plugins: PluginContribution[] = [];

		// Add the inputRules plugin with all rules
		const rules = ruleSpecs.map((spec) => spec.rule);
		plugins.push(this.contribution(inputRules({ rules })));

		// Add undo input rule keybind
		plugins.push(
			this.contribution(
				keymap({
					Backspace: undoInputRule,
				}),
				// Run before other Backspace handlers
				contributionPriority.high
			)
		);

		// Add plugin to handle Enter if needed
		const enterHandlers = ruleSpecs
			.filter((spec) => spec.enterHandler)
			.map((spec) => spec.enterHandler!);
		if (enterHandlers.length > 0) {
			plugins.push(
				this.contribution(
					keymap({
						Enter: (state, dispatch) => {
							const { $cursor } = state.selection as TextSelection;
							if (!$cursor) return false;

							const textBefore = textBeforeCursor($cursor);

							for (const { regex, handler } of enterHandlers) {
								const match = regex.exec(textBefore);
								if (!match) continue;

								const matchStart =
									$cursor.pos - $cursor.parentOffset + match.index;
								const matchEnd = matchStart + match[0].length;

								const tr = handler(state, match, matchStart, matchEnd);
								if (tr) {
									dispatch?.(tr);
								}

								break;
							}

							return false; // Let the default Enter handler run after
						},
					}),
					// Run before other Enter handlers so rules are applied first
					contributionPriority.highest
				)
			);
		}

		return plugins;
	}
}
