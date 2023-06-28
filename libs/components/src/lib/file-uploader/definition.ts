import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import { buttonRegistries } from '../button/definition';
import styles from './file-uploader.scss';

import { FileUploader } from './file-uploader';
import { FileUploaderTemplate as template } from './file-uploader.template';

export const fileUploaderDefinition =
	FileUploader.compose<FoundationElementDefinition>({
		baseName: 'file-uploader',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

/**
 * @internal
 */
export const fileUploaderRegistries = [fileUploaderDefinition(), ...iconRegistries, ...focusRegistries, ...buttonRegistries];

/**
 * Registers the file-uploader element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFileUploader = registerFactory(fileUploaderRegistries);
