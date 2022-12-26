import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { elevationRegistries } from '../elevation/definition';
import { Popup } from './popup';
import styles from './popup.scss';
import { popupTemplate as template } from './popup.template';
import '@oddbird/popover-polyfill';


/**
 * Represents a popup custom element.
 * popup is...
 */
export const popupDefinition = Popup.compose<FoundationElementDefinition>({
	baseName: 'popup',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const popupRegistries = [popupDefinition(), ...elevationRegistries, ...buttonRegistries];

/**
 * Registers the popup elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPopup = registerFactory(popupRegistries);
