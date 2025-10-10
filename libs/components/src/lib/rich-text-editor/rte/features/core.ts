import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import proseMirrorCss from 'prosemirror-view/style/prosemirror.css?inline';
import { RTEFeature } from '../feature';
import type { Locale } from '../../../../shared/localization/Locale';
import type { VividElementDefinitionContext } from '../../../../shared/design-system/defineVividComponent';
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

	override getPlugins() {
		return [
			{ plugin: keymap(baseKeymap) },
			{ plugin: dropCursor() },
			{ plugin: gapCursor() },
			{ plugin: hostBridgePlugin },
		];
	}

	override getFeatures() {
		return [this, new RTEHistoryFeature(), new RTEPlaceholderFeature()];
	}
}
