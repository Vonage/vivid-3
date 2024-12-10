import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './breadcrumb-item.scss?inline';
import { BreadcrumbItem } from './breadcrumb-item';
import { BreadcrumbItemTemplate as template } from './breadcrumb-item.template';

/**
 * @internal
 */
export const breadcrumbItemDefinition = defineVividComponent(
	'breadcrumb-item',
	BreadcrumbItem,
	template,
	[iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the breadcrumb-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumbItem = createRegisterFunction(
	breadcrumbItemDefinition
);
