import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import { Popup } from './popup';
import styles from './popup.scss';
import { popupTemplate as template } from './popup.template';


const prefix = getPrefix(import.meta.url);

/**
 * Represents a popup custom element.
 * popup is...
 */
export const vividPopup = Popup.compose<FoundationElementDefinition>({
	baseName: 'popup',
	template: template as any,
	styles,
});

( async () => {
	await loadComponentsModules(['elevation', 'button'], prefix);
	designSystem.withPrefix(prefix).register(vividPopup());
})();
