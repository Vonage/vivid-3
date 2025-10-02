import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import {
	buttonDefinition,
	dividerDefinition,
	listboxOptionDefinition,
	menuDefinition,
	menuItemDefinition,
	selectDefinition,
	tooltipDefinition,
} from '../components';
import styles from './rich-text-editor.scss?inline';
import { RichTextEditor } from './rich-text-editor';
import { RichTextEditorTemplate as template } from './rich-text-editor.template';

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

export { RTEConfig } from './rte/config';
export { RTECore } from './rte/features/core';
export { RTETextBlockStructure } from './rte/features/text-block';
export { RTEFreeformStructure } from './rte/features/freeform';
export { RTEToolbarFeature } from './rte/features/toolbar';
export { RTEFontSizeFeature } from './rte/features/font-size';
export { RTEBoldFeature } from './rte/features/bold';
export { RTEItalicFeature } from './rte/features/italic';
export { RTEUnderlineFeature } from './rte/features/underline';
export { RTEStrikethroughFeature } from './rte/features/strikethrough';
export { RTEMonospaceFeature } from './rte/features/monospace';
