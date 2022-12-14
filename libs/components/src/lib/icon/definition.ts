import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './icon.scss';
import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';


/**
 * @internal
 */
export const icon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
})();

export const iconElements = [icon];

/**
 * Registers the icon component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerIcon = registerFactorial(iconElements);
