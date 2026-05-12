import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './kbd-shortcut.scss?inline';

import { KbdShortcut } from './kbd-shortcut';
import { KbdShortcutTemplate as template } from './kbd-shortcut.template';

/**
 * @internal
 */
export const kbdShortcutDefinition = defineVividComponent(
	'kbd-shortcut',
	KbdShortcut,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the kbd-shortcut element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerKbdShortcut = createRegisterFunction(
	kbdShortcutDefinition
);

export { KbdShortcut as VwcKbdShortcutElement };
