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
import { featureFacade, RteFeatureImpl } from '../../feature';
import type { Locale } from '../../../../../shared/localization/Locale';
import type { VividElementDefinitionContext } from '../../../../../shared/design-system/defineVividComponent';
import type { RteInstanceImpl } from '../../instance';
import { defaultTextblockForMatch } from '../../utils/default-textblock';
import uiCss from '../../utils/ui.style.scss?inline';
import { FeatureState } from '../../utils/feature-state';
import coreCss from './core.style.scss?inline';
import { RteHistoryFeatureImpl } from './history';
import { RteForeignHtmlFeatureImpl } from './foreign-html';
import { RteCursorFixFeatureImpl } from './cursor-fix';

export interface HostState {
	ctx: VividElementDefinitionContext;
	locale: Locale;
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

export class RteCoreImpl extends RteFeatureImpl {
	name = 'RteCore';

	disabled = new FeatureState(false);

	override getStyles() {
		return [
			this.contribution(proseMirrorCss),
			this.contribution(coreCss),
			this.contribution(uiCss),
		];
	}

	override getPlugins(rte: RteInstanceImpl) {
		return [
			this.contribution(this.disabled.plugin),
			this.contribution(
				new Plugin({
					props: {
						editable: () => !this.disabled.getValue(rte),
						handleDOMEvents: {
							click: (_view, event) => {
								if (this.disabled.getValue(rte)) {
									event.preventDefault();
									return true;
								}
								return false;
							},
						},
					},
					view: (view) => {
						const popovers = (
							view.dom.getRootNode() as ShadowRoot
						).querySelector('.popovers')!;

						const updatePopoversDisabled = () => {
							popovers.classList.toggle(
								'popovers--disabled',
								this.disabled.getValue(rte)
							);
						};

						updatePopoversDisabled();

						return {
							update: () => {
								updatePopoversDisabled();
							},
						};
					},
				})
			),
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
			new RteForeignHtmlFeatureImpl(),
			new RteCursorFixFeatureImpl(),
		];
	}
}

export const RteCore = featureFacade(RteCoreImpl);
