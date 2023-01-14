import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { breadcrumbTemplate as template } from './breadcrumb.template';
import styles from './breadcrumb.scss';
import { Breadcrumb } from './breadcrumb';

/**
 *
 * @internal
 */
export const breadcrumbDefinition = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
});

/**
 * @internal
 */
export const breadcrumbRegistries = [breadcrumbDefinition()];

/**
 * Registers the breadcrumb elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumb = registerFactory(breadcrumbRegistries);
