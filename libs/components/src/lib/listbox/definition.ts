import { listboxOptionDefinition } from '../option/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Listbox } from './listbox';
import { ListboxTemplate as template } from './listbox.template';
import styles from './listbox.scss?inline';

export type { LisboxAppearance } from './listbox';

/**
 * @internal
 */
export const listboxDefinition = defineVividComponent(
	'listbox',
	Listbox,
	template,
	[listboxOptionDefinition],
	{
		styles,
	}
);

/**
 * Registers the listbox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerListbox = createRegisterFunction(listboxDefinition);
