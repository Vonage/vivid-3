import { iconDefinition } from '../icon/definition';
import { popupDefinition } from '../popup/definition';
import { listboxOptionDefinition } from '../option/definition';
import textFieldStyles from '../text-field/text-field.scss?inline';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { feedbackMessageDefinition } from '../../shared/feedback/feedback-message';
import styles from './combobox.scss?inline';
import { Combobox } from './combobox';
import { comboboxTemplate as template } from './combobox.template';

export type { PopupPlacement, ComboboxAppearance } from './combobox';

/**
 * @internal
 */
export const comboboxDefinition = defineVividComponent(
	'combobox',
	Combobox,
	template,
	[
		iconDefinition,
		popupDefinition,
		listboxOptionDefinition,
		feedbackMessageDefinition,
	],
	{
		styles: [textFieldStyles, styles],
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the combobox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCombobox = createRegisterFunction(comboboxDefinition);

export { Combobox as VwcComboboxElement };
