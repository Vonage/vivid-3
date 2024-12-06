import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './switch.scss?inline';
import { Switch } from './switch';
import { SwitchTemplate as template } from './switch.template';

export type { SwitchConnotation } from './switch';

/**
 * @internal
 */
export const switchDefinition = defineVividComponent(
	'switch',
	Switch,
	template,
	[iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the switch elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSwitch = createRegisterFunction(switchDefinition);
