import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './platform-switch.scss?inline';

import { PlatformSwitch } from './platform-switch';
import { PlatformSwitchTemplate as template } from './platform-switch.template';

/**
 * @internal
 */
export const platformSwitchDefinition = defineVividComponent(
	'platform-switch',
	PlatformSwitch,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the platform-switch element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerPlatformSwitch = createRegisterFunction(
	platformSwitchDefinition
);

export { PlatformSwitch as VwcPlatformSwitchElement };
