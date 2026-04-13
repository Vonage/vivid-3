import { kbdShortcutDefinition } from '../kbd-shortcut/definition';
import { kbdKeyDefinition } from '../kbd-key/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './kbd-shortcut-text.scss?inline';

import { KbdShortcutText } from './kbd-shortcut-text';
import { KbdShortcutTextTemplate as template } from './kbd-shortcut-text.template';

/**
 * @internal
 */
export const kbdShortcutTextDefinition = defineVividComponent(
	'kbd-shortcut-text',
	KbdShortcutText,
	template,
	[kbdShortcutDefinition, kbdKeyDefinition],
	{
		styles,
	}
);

/**
 * Registers the kbd-shortcut-text element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerKbdShortcutText = createRegisterFunction(
	kbdShortcutTextDefinition
);

export { KbdShortcutText as VwcKbdShortcutTextElement };
