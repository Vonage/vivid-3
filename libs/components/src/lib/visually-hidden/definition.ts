import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './visually-hidden.scss?inline';

import { VisuallyHidden } from './visually-hidden';
import { VisuallyHiddenTemplate as template } from './visually-hidden.template';

export const visuallyHiddenDefinition = defineVividComponent(
	'visually-hidden',
	VisuallyHidden,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the visually-hidden element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerVisuallyHidden = createRegisterFunction(
	visuallyHiddenDefinition
);

export { VisuallyHidden as VwcVisuallyHiddenElement };
