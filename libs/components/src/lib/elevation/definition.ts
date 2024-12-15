import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Elevation } from './elevation';
import styles from './elevation.scss?inline';
import { elevationTemplate as template } from './elevation.template';

/**
 * @internal
 */
export const elevationDefinition = defineVividComponent(
	'elevation',
	Elevation,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the elevation elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerElevation = createRegisterFunction(elevationDefinition);
