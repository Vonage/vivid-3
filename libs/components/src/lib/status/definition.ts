import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './status.scss?inline';
import { Status } from './status';
import { StatusTemplate as template } from './status.template';

export type { StatusConnotation } from './status';

/**
 * @internal
 */
export const statusDefinition = defineVividComponent(
	'status',
	Status,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the status element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerStatus = createRegisterFunction(statusDefinition);

export { Status as VwcStatusElement };
