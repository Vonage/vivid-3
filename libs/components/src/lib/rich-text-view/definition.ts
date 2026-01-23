import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './rich-text-view.scss?inline';

import { RichTextView } from './rich-text-view';
import { RichTextViewTemplate as template } from './rich-text-view.template';

export const richTextViewDefinition = defineVividComponent(
	'rich-text-view',
	RichTextView,
	template,
	[],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the rich-text-view element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRichTextView = createRegisterFunction(
	richTextViewDefinition
);

export { RichTextView as VwcRichTextViewElement };
