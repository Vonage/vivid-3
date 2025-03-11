import { buttonDefinition } from '../button/definition';
import { elevationDefinition } from '../elevation/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Popup } from './popup';
import styles from './popup.scss?inline';
import { popupTemplate as template } from './popup.template';

export type { Strategy } from '@floating-ui/dom';

/**
 * @internal
 */
export const popupDefinition = defineVividComponent(
	'popup',
	Popup,
	template,
	[elevationDefinition, buttonDefinition],
	{
		styles,
	}
);

/**
 * Registers the popup elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPopup = createRegisterFunction(popupDefinition);
