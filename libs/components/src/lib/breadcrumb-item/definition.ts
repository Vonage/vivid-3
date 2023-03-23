import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory} from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import styles from './breadcrumb-item.scss';

import {BreadcrumbItem} from './breadcrumb-item';
import {BreadcrumbItemTemplate as template} from './breadcrumb-item.template';


/**
 *
 * @internal
 */
export const breadcrumbItemDefinition = BreadcrumbItem.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb-item',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const breadcrumbItemRegistries = [breadcrumbItemDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the breadcrumb-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumbItem = registerFactory(breadcrumbItemRegistries);
