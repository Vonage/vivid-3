import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './divider.scss';

import { Divider } from './divider';
import { DividerTemplate as template } from './divider.template';


/**
 * The Divider element.
 *
 * @internal
 */
export const divider = Divider.compose<FoundationElementDefinition>({
	baseName: 'divider',
	template: template as any,
	styles,
})();

export const dividerElements = [divider];

/**
 * Registers the divider elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDivider = registerFactorial(dividerElements);
