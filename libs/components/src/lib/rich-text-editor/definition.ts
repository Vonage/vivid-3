import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './rich-text-editor.scss?inline';
import { RichTextEditor } from './rich-text-editor';
import { RichTextEditorTemplate as template } from './rich-text-editor.template';
import { popoverDefinition } from './popover';
import { dividerDefinition } from '../divider/definition';
import { selectDefinition } from '../select/definition';
import { listboxOptionDefinition } from '../option/definition';
import { buttonDefinition } from '../button/definition';
import { tooltipDefinition } from '../tooltip/definition';
import { menuDefinition } from '../menu/definition';
import { menuItemDefinition } from '../menu-item/definition';
import { textFieldDefinition } from '../text-field/definition';
import { progressRingDefinition } from '../progress-ring/definition';

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
