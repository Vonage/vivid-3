import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { buttonElements } from '../button/definition';
import { elevationElements } from '../elevation/definition';
import { Popup } from './popup';
import styles from './popup.scss';
import { popupTemplate as template } from './popup.template';



/**
 * Represents a popup custom element.
 * popup is...
 */
export const popup = Popup.compose<FoundationElementDefinition>({
	baseName: 'popup',
	template: template as any,
	styles,
})();

export const popupElements = [popup, ...elevationElements, ...buttonElements];

/**
 * Registers the popup elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPopup = registerFactorial(popupElements);
