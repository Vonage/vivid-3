import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial} from '../../shared/design-system';
import { icon } from '../icon/definition';
import { focus } from '../focus/definition';
import styles from './breadcrumb-item.scss';

import {BreadcrumbItem} from './breadcrumb-item';
import {BreadcrumbItemTemplate as template} from './breadcrumb-item.template';


const breadcrumbItem = BreadcrumbItem.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb-item',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();

export const breadcrumbItemElements = [breadcrumbItem, icon, focus];

/**
 * Registers the breadcrumb-item component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumbItem = registerFactorial(...breadcrumbItemElements);
