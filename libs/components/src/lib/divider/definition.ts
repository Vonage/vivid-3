import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './divider.scss?inline';
import { Divider } from './divider';
import { DividerTemplate as template } from './divider.template';

export type { DividerAppearance } from './divider';

/**
 * @internal
 */
export const dividerDefinition = defineVividComponent(
	'divider',
	Divider,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the divider elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDivider = createRegisterFunction(dividerDefinition);

export { Divider as VwcDividerElement };
