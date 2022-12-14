import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial} from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './breadcrumb-item.scss';

import {BreadcrumbItem} from './breadcrumb-item';
import {BreadcrumbItemTemplate as template} from './breadcrumb-item.template';


/**
 *
 * @internal
 */
export const breadcrumbItem = BreadcrumbItem.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb-item',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();

export const breadcrumbItemElements = [breadcrumbItem, ...iconElements, ...focusElements];

/**
 * Registers the breadcrumb-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumbItem = registerFactorial(breadcrumbItemElements);
