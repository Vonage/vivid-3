import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './my-component.scss?inline';

import { MyComponent } from './my-component';
import { MyComponentTemplate as template } from './my-component.template';

export const myComponentDefinition = defineVividComponent(
	'my-component',
	MyComponent,
	template,
	[],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the my-component element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMyComponent = createRegisterFunction(
	myComponentDefinition
);
