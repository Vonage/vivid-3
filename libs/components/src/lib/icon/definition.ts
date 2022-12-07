import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../shared/design-system';
import styles from './icon.scss';
import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';


export const icon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
})();

/**
 * Registers the icon component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
const registerIcon = registerFactorial(icon);

export { registerIcon };
