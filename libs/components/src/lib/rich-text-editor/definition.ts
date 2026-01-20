import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import {
	buttonDefinition,
	dividerDefinition,
	listboxOptionDefinition,
	menuDefinition,
	menuItemDefinition,
	progressRingDefinition,
	selectDefinition,
	textFieldDefinition,
	tooltipDefinition,
} from '../components';
import styles from './rich-text-editor.scss?inline';
import { RichTextEditor } from './rich-text-editor';
import { RichTextEditorTemplate as template } from './rich-text-editor.template';
import { popoverDefinition } from './popover';

export const richTextEditorDefinition = defineVividComponent(
	'rich-text-editor',
	RichTextEditor,
	template,
	[
		dividerDefinition,
		selectDefinition,
		listboxOptionDefinition,
		buttonDefinition,
		tooltipDefinition,
		menuDefinition,
		menuItemDefinition,
		textFieldDefinition,
		popoverDefinition,
		progressRingDefinition,
	],
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

export { RichTextEditor as VwcRichTextEditorElement };

export * from './rte/exports';
