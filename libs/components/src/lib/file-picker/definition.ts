import { iconDefinition } from '../icon/definition';
import { buttonDefinition } from '../button/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './file-picker.scss?inline';
import { FilePicker } from './file-picker';
import { FilePickerTemplate as template } from './file-picker.template';

/**
 * @internal
 */
export const filePickerDefinition = defineVividComponent(
	'file-picker',
	FilePicker,
	template,
	[iconDefinition, buttonDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the file-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFilePicker = createRegisterFunction(filePickerDefinition);

export { FilePicker as VwcFilePickerElement };
