import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './file-picker.scss';

import { FilePicker } from './file-picker';
import { FilePickerTemplate as template } from './file-picker.template';

export const filePickerDefinition =
	FilePicker.compose<FoundationElementDefinition>({
		baseName: 'file-picker',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const filePickerRegistries = [filePickerDefinition()];

/**
 * Registers the file-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFilePicker = registerFactory(filePickerRegistries);
