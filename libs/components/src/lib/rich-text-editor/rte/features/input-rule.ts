import { Fragment } from 'prosemirror-model';
import { InputRule } from 'prosemirror-inputrules';
import type { EditorState } from 'prosemirror-state';
import {
	featureFacade,
	type InputRuleContribution,
	RteFeatureImpl,
} from '../feature';
import type { RteInstanceImpl } from '../instance';
import type { RteFragment } from '../document';
import type { InputRuleSpec } from './internal/input-rules';

export type InputRuleHandler = (match: RegExpMatchArray) => RteFragment | null;

export interface RteInputRuleFeatureOptions {
	/**
	 * The regex to match against text before the cursor. No trailing `$` is required.
	 */
	pattern: RegExp;
	/**
	 * Handler called when the input rule matches.
	 * Return an RteFragment to replace the match, or null to skip.
	 */
	handler: InputRuleHandler;
	/**
	 * When true, the rule triggers only on space or Enter after the pattern.
	 */
	matchAfterWhitespace?: boolean;
}

class RteInputRuleFeatureImpl extends RteFeatureImpl {
	name: string;

	constructor(
		protected readonly featureId: string,
		protected readonly options: RteInputRuleFeatureOptions
	) {
		super();
		this.name = `RteInputRuleFeature[${featureId}]`;
	}

	override getInputRules(rte: RteInstanceImpl): InputRuleContribution[] {
		// Wrap in non-capturing group to handle alternation (|) in user patterns
		const basePattern = `(?:${this.options.pattern.source})`;

		const handler = (
			state: EditorState,
			match: RegExpMatchArray,
			start: number,
			end: number
		) => {
			const fragment = this.options.handler(match);
			if (!fragment) return null;

			return state.tr.replaceWith(
				start,
				end,
				Fragment.fromJSON(rte.schema, fragment)
			);
		};

		const regex = this.options.matchAfterWhitespace
			? new RegExp(`${basePattern} $`)
			: new RegExp(`${basePattern}$`);

		const inputRule = new InputRule(regex, handler);

		const spec: InputRuleSpec = {
			rule: inputRule,
		};

		if (this.options.matchAfterWhitespace) {
			spec.enterHandler = {
				regex: new RegExp(`${basePattern}$`),
				handler,
			};
		}

		return [this.contribution(spec)];
	}
}

export const RteInputRuleFeature = featureFacade(RteInputRuleFeatureImpl);
