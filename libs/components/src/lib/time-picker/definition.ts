import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { textFieldRegistries } from '../text-field/definition';
import { popupRegistries } from '../popup/definition';
import { buttonRegistries } from '../button/definition';
import styles from './time-picker.scss?inline';

import { TimePicker } from './time-picker';
import { TimePickerTemplate as template } from './time-picker.template';

export const timePickerDefinition =
	TimePicker.compose<FoundationElementDefinition>({
		baseName: 'time-picker',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

/**
 * @internal
 */
export const timePickerRegistries = [
	timePickerDefinition(),
	...textFieldRegistries,
	...popupRegistries,
	...buttonRegistries,
];

/**
 * Registers the time-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTimePicker = registerFactory(timePickerRegistries);
