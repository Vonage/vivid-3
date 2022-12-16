import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { Layout } from './layout';
import styles from './layout.scss';
import { layoutTemplate as template } from './layout.template';


/**
 * Represents a layout custom element.
 * layout is...
 *
 * @internal
 */
export const layout = Layout.compose<FoundationElementDefinition>({
	baseName: 'layout',
	template: template as any,
	styles,
})();

export const layoutElements = [layout];

/**
 * Registers the layout elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerLayout = registerFactorial(layoutElements);
