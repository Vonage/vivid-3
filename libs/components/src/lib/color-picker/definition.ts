import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { popupDefinition } from '../popup/definition';
import { iconDefinition } from '../icon/definition';
import { buttonDefinition, textFieldDefinition } from '../components';
import { feedbackMessageDefinition } from '../../shared/feedback/feedback-message';
import styles from './color-picker.scss?inline';

import { ColorPicker } from './color-picker';
import { ColorPickerTemplate as template } from './color-picker.template';

export const colorPickerDefinition = defineVividComponent(
	'color-picker',
	ColorPicker,
	template,
	[
		popupDefinition,
		iconDefinition,
		textFieldDefinition,
		buttonDefinition,
		feedbackMessageDefinition,
	],
	{
		styles,
	}
);

/**
 * Registers the color-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerColorPicker = createRegisterFunction(
	colorPickerDefinition
);

export { ColorPicker as VwcColorPickerElement };
