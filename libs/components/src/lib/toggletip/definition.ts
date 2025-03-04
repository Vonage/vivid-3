import { popupDefinition } from '../popup/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './toggletip.scss?inline';
import { Toggletip } from './toggletip';
import { ToggletipTemplate as template } from './toggletip.template';

/**
 * @internal
 */
export const toggletipDefinition = defineVividComponent(
	'toggletip',
	Toggletip,
	template,
	[popupDefinition],
	{
		styles,
	}
);

/**
 * Registers the toggletip element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerToggletip = createRegisterFunction(toggletipDefinition);
