import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './icon.scss?inline';
import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';

export type { IconConnotation } from './icon';

/**
 * @internal
 */
export const iconDefinition = defineVividComponent('icon', Icon, template, [], {
	styles,
});

/**
 * Registers the icon component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerIcon = createRegisterFunction(iconDefinition);

export { Icon as VwcIconElement };
