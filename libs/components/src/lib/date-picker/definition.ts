import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { popupDefinition } from '../popup/definition';
import { buttonDefinition } from '../button/definition';
import { textFieldDefinition } from '../text-field/definition';
import { focusDefinition } from '../focus/definition';
import styles from './date-picker.scss';

import { DatePicker } from './date-picker';
import { DatePickerTemplate as template } from './date-picker.template';

export const datePickerDefinition =
	DatePicker.compose<FoundationElementDefinition>({
		baseName: 'date-picker',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const datePickerRegistries = [
	datePickerDefinition(),
	buttonDefinition(),
	popupDefinition(),
	textFieldDefinition(),
	focusDefinition(),
];

/**
 * Registers the date-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDatePicker = registerFactory(datePickerRegistries);
