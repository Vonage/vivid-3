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
import proseMirrorCss from 'prosemirror-view/style/prosemirror.css?inline';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { featureFacade, RTEFeatureImpl } from '../feature';
import type { Locale } from '../../../../shared/localization/Locale';
import type { VividElementDefinitionContext } from '../../../../shared/design-system/defineVividComponent';
import type { RTEInstanceImpl } from '../instance';
import { defaultTextblockForMatch } from '../utils/default-textblock';
import coreCss from './core.style.scss?inline';
import { RTEHistoryFeatureImpl } from './internal/history';
import { RTEPlaceholderFeatureImpl } from './internal/placeholder';
import { RTEForeignHtmlFeatureImpl } from './internal/foreign-html';

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
export class RTECoreImpl extends RTEFeatureImpl {
	protected name = 'RTECore';

	override getStyles() {
		return [this.contribution(proseMirrorCss), this.contribution(coreCss)];
	}

	override getPlugins(rte: RTEInstanceImpl) {
		return [
			this.contribution(
				keymap({
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
								type: defaultTextblockForMatch(
									$from
										.node($from.depth - 1)
										.contentMatchAt($from.indexAfter($from.depth - 1))
								)!,
								attrs: rte.textblockAttrs.extractFromNode(node),
							};
						})
					),
				})
			),
			this.contribution(dropCursor()),
			this.contribution(gapCursor()),
			this.contribution(hostBridgePlugin),
		];
	}

	override getFeatures(): RTEFeatureImpl[] {
		return [
			this,
			new RTEHistoryFeatureImpl(),
			new RTEPlaceholderFeatureImpl(),
			new RTEForeignHtmlFeatureImpl(),
		];
	}
}

export const RTECore = featureFacade(RTECoreImpl);
