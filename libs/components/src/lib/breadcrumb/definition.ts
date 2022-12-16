import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { breadcrumbTemplate as template } from './breadcrumb.template';
import styles from './breadcrumb.scss';
import { Breadcrumb } from './breadcrumb';

/**
 *
 * @internal
 */
export const breadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
})();

export const breadcrumbElements = [breadcrumb];

/**
 * Registers the breadcrumb elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumb = registerFactorial(breadcrumbElements);
