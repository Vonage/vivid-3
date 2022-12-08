import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { breadcrumbTemplate as template } from './breadcrumb.template';
import styles from './breadcrumb.scss';
import { Breadcrumb } from './breadcrumb';

export const breadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
})();

/**
 * Registers the breadcrumb component
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumb = registerFactorial(breadcrumb);
