import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './kbd-key.scss?inline';

import { KbdKey } from './kbd-key';
import { KbdKeyTemplate as template } from './kbd-key.template';

export type {
	KbdKeyName,
	KbdKeyAppearance,
	KbdKeySize,
	KbdKeyKeyboard,
} from './kbd-key';

/**
 * @internal
 */
export const kbdKeyDefinition = defineVividComponent(
	'kbd-key',
	KbdKey,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the kbd-key element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerKbdKey = createRegisterFunction(kbdKeyDefinition);

export { KbdKey as VwcKbdKeyElement };
