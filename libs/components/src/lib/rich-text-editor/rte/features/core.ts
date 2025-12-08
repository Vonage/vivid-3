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
import { featureFacade, RteFeatureImpl } from '../feature';
import type { Locale } from '../../../../shared/localization/Locale';
import type { VividElementDefinitionContext } from '../../../../shared/design-system/defineVividComponent';
import type { RteInstanceImpl } from '../instance';
import { defaultTextblockForMatch } from '../utils/default-textblock';
import uiCss from '../utils/ui.style.scss?inline';
import coreCss from './core.style.scss?inline';
import { RteHistoryFeatureImpl } from './internal/history';
import { RtePlaceholderFeatureImpl } from './internal/placeholder';
import { RteForeignHtmlFeatureImpl } from './internal/foreign-html';

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
export class RteCoreImpl extends RteFeatureImpl {
	protected name = 'RteCore';

	override getStyles() {
		return [
			this.contribution(proseMirrorCss),
			this.contribution(coreCss),
			this.contribution(uiCss),
		];
	}

	override getPlugins(rte: RteInstanceImpl) {
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

	override getFeatures(): RteFeatureImpl[] {
		return [
			this,
			new RteHistoryFeatureImpl(),
			new RtePlaceholderFeatureImpl(),
			new RteForeignHtmlFeatureImpl(),
		];
	}
}

export const RteCore = featureFacade(RteCoreImpl);
