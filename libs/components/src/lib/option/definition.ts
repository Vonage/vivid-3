import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { ListboxOption } from './option';
import { ListboxOptionTemplate as template } from './option.template';
import styles from './option.scss?inline';

/**
 * @internal
 */
export const listboxOptionDefinition = defineVividComponent(
	'option',
	ListboxOption,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the listbox-option elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerOption = createRegisterFunction(listboxOptionDefinition);
