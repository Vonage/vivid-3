import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { popupRegistries } from '../popup/definition';
import { buttonRegistries } from '../button/definition';
import { textFieldRegistries } from '../text-field/definition';
import { dividerRegistries } from '../divider/definition';
import styles from '../../shared/date-picker/date-picker-base.scss?inline';
import { DatePickerBaseTemplate as template } from '../../shared/date-picker/date-picker-base.template';
import { DatePicker } from './date-picker';

export const datePickerDefinition =
	DatePicker.compose<FoundationElementDefinition>({
		baseName: 'date-picker',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

/**
 * @internal
 */
export const datePickerRegistries = [
	datePickerDefinition(),
	...buttonRegistries,
	...popupRegistries,
	...textFieldRegistries,
	...dividerRegistries,
];

/**
 * Registers the date-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDatePicker = registerFactory(datePickerRegistries);
