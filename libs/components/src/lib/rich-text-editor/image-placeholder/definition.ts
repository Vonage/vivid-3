import { createRegisterFunction } from '../../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../../shared/design-system/defineVividComponent';
import { iconDefinition } from '../../components';
import styles from './image-placeholder.scss?inline';

import { ImagePlaceholder } from './image-placeholder.js';
import { ImagePlaceholderTemplate as template } from './image-placeholder.template.js';

export const imagePlaceholderDefinition = defineVividComponent(
	'text-editor-image-placeholder',
	ImagePlaceholder,
	template,
	[iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the menubar element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerImagePlaceholder = createRegisterFunction(imagePlaceholderDefinition);
