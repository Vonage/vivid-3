import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import {
	baseKeymap,
	chainCommands,
	createParagraphNear,
	liftEmptyBlock,
	newlineInCode,
	splitBlockAs,
} from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import proseMirrorCss from 'prosemirror-view/style/prosemirror.css?inline';
import type { ContentMatch } from 'prosemirror-model';
import { RTEFeature } from '../feature';
import type { Locale } from '../../../../shared/localization/Locale';
import type { VividElementDefinitionContext } from '../../../../shared/design-system/defineVividComponent';
import type { RTEInstance } from '../instance';
import coreCss from './core.style.scss?inline';
import { RTEHistoryFeature } from './internal/history';
import { RTEPlaceholderFeature } from './internal/placeholder';

export interface HostState {
	ctx: VividElementDefinitionContext;
	locale: Locale;
	placeholder: string | undefined;
}

/**
 * Plugin to bring state from the host web component into ProseMirror.
 */
export const hostBridgePlugin = new Plugin<HostState | null>({
	state: {
		init() {
			return null;
		},
		apply(tr, value) {
			const meta = tr.getMeta(hostBridgePlugin);
			if (meta) {
				return meta;
			} else {
				return value;
			}
		},
	},
});

// Even though core is required, it's still a feature so that there is the possibility of different cores in the future
/**
 * The core feature is required and provides basic editor functionality.
 */
export class RTECore extends RTEFeature {
	override getStyles() {
		return [{ css: proseMirrorCss }, { css: coreCss }];
	}

	override getPlugins(rte: RTEInstance) {
		function defaultTextblockAt(match: ContentMatch) {
			for (let i = 0; i < match.edgeCount; i++) {
				const { type } = match.edge(i);
				if (type.isTextblock && !type.hasRequiredAttrs()) return type;
			}
			/* v8 ignore next 1 */
			throw new Error('No default textblock found.');
		}

		return [
			{
				plugin: keymap({
					...baseKeymap,
					Enter: chainCommands(
						newlineInCode,
						createParagraphNear,
						liftEmptyBlock,
						splitBlockAs((node, atEnd, $from) => {
							if (!atEnd) {
								// If not at end, keep the same type
								return { type: node.type, attrs: node.attrs! };
							}
							// Otherwise, create a default textblock
							return {
								type: defaultTextblockAt(
									$from.node($from.depth - 1).contentMatchAt($from.indexAfter())
								)!,
								attrs: rte.textblockAttrs.extractFromNode(node),
							};
						})
					),
				}),
			},
			{ plugin: dropCursor() },
			{ plugin: gapCursor() },
			{ plugin: hostBridgePlugin },
		];
	}

	override getFeatures() {
		return [this, new RTEHistoryFeature(), new RTEPlaceholderFeature()];
	}
}
