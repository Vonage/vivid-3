import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { feedbackMessageDefinition } from '../../shared/feedback/feedback-message';
import styles from './text-area.scss?inline';
import { TextArea } from './text-area';
import { TextAreaTemplate as template } from './text-area.template';

export type { TextAreaWrap } from './text-area';

/**
 * @internal
 */
export const textAreaDefinition = defineVividComponent(
	'text-area',
	TextArea,
	template,
	[feedbackMessageDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the text-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextArea = createRegisterFunction(textAreaDefinition);

export { TextArea as VwcTextAreaElement };
