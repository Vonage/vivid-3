import { iconDefinition } from '../icon/definition';
import { buttonDefinition } from '../button/definition';
import { elevationDefinition } from '../elevation/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './dialog.scss?inline';
import { Dialog } from './dialog';
import { DialogTemplate as template } from './dialog.template';

export type { IconPlacement } from './dialog';

/**
 * @internal
 */
export const dialogDefinition = defineVividComponent(
	'dialog',
	Dialog,
	template,
	[iconDefinition, buttonDefinition, elevationDefinition],
	{
		styles,
	}
);

/**
 * Registers the dialog elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDialog = createRegisterFunction(dialogDefinition);
