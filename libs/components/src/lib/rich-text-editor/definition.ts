import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { dividerDefinition } from '../components';
import styles from './rich-text-editor.scss?inline';

import { menuBarDefinition } from './menubar/definition';
import {
	RichTextEditor,
	type RichTextEditorInlineImageProps,
} from './rich-text-editor';
import { RichTextEditorTemplate as template } from './rich-text-editor.template';
import { imagePlaceholderDefinition } from './image-placeholder/definition';

export const richTextEditorDefinition = defineVividComponent(
	'rich-text-editor',
	RichTextEditor,
	template,
	[menuBarDefinition, dividerDefinition, imagePlaceholderDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the rich-text-editor element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRichTextEditor = createRegisterFunction(
	richTextEditorDefinition
);

export {
	RichTextEditor as VwcRichTextEditorElement,
	type RichTextEditorInlineImageProps,
};
