import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { popupDefinition } from '../popup/definition';
import { iconDefinition } from '../icon/definition';
import styles from './simple-color-picker.scss?inline';

import { SimpleColorPicker } from './simple-color-picker';
import { SimpleColorPickerTemplate as template } from './simple-color-picker.template';

export const simpleColorPickerDefinition = defineVividComponent(
	'simple-color-picker',
	SimpleColorPicker,
	template,
	[popupDefinition, iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the simple-color-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSimpleColorPicker = createRegisterFunction(
	simpleColorPickerDefinition
);

export { SimpleColorPicker as VwcSimpleColorPickerElement };
