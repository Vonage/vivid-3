import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './fab.scss?inline';
import { Fab } from './fab';
import { FabTemplate as template } from './fab.template';

export type { FabConnotation, FABSize } from './fab';

/**
 * @internal
 */
export const fabDefinition = defineVividComponent(
	'fab',
	Fab,
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
 * Registers the FAB elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFab = createRegisterFunction(fabDefinition);
