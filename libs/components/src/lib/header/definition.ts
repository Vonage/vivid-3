import { elevationDefinition } from '../elevation/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './header.scss?inline';
import { Header } from './header';
import { headerTemplate as template } from './header.template';

/**
 * @internal
 */
export const headerDefinition = defineVividComponent(
	'header',
	Header,
	template,
	[elevationDefinition],
	{
		styles,
	}
);

/**
 * Registers the header elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerHeader = createRegisterFunction(headerDefinition);
