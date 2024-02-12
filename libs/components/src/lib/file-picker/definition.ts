import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import { buttonRegistries } from '../button/definition';
import styles from './file-picker.scss?inline';

import { FilePicker } from './file-picker';
import { FilePickerTemplate as template } from './file-picker.template';

export const filePickerDefinition =
	FilePicker.compose<FoundationElementDefinition>({
		baseName: 'file-picker',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

/**
 * @internal
 */
export const filePickerRegistries = [filePickerDefinition(), ...iconRegistries, ...focusRegistries, ...buttonRegistries];

/**
 * Registers the file-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFilePicker = registerFactory(filePickerRegistries);
