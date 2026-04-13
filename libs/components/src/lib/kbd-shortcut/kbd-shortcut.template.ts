import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { KbdShortcut } from './kbd-shortcut';

export const KbdShortcutTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<KbdShortcut> = () => {
	return html<KbdShortcut>`<span class="base" role="group"
		><slot></slot
	></span>`;
};
