import { buttonDefinition } from '../button/definition';
import { elevationDefinition } from '../elevation/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { iconDefinition } from '../icon/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './alert.scss?inline';
import { Alert } from './alert';
import { AlertTemplate as template } from './alert.template';

export type { AlertConnotation } from './alert';

/**
 * @internal
 */
export const alertDefinition = defineVividComponent(
	'alert',
	Alert,
	template,
	[iconDefinition, buttonDefinition, elevationDefinition],
	{
		styles,
	}
);

/**
 * Registers the alert elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAlert = createRegisterFunction(alertDefinition);

export { Alert as VwcAlertElement };
