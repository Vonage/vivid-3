import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { breadcrumbTemplate as template } from './breadcrumb.template';
import styles from './breadcrumb.scss?inline';
import { Breadcrumb } from './breadcrumb';

/**
 * @internal
 */
export const breadcrumbDefinition = defineVividComponent(
	'breadcrumb',
	Breadcrumb,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the breadcrumb elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBreadcrumb = createRegisterFunction(breadcrumbDefinition);
