import { checkboxDefinition } from '../checkbox/definition';
import { radioDefinition } from '../radio/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './selectable-box.scss?inline';
import { SelectableBox } from './selectable-box';
import { SelectableBoxTemplate as template } from './selectable-box.template';

/**
 * @internal
 */
export const selectableBoxDefinition = defineVividComponent(
	'selectable-box',
	SelectableBox,
	template,
	[checkboxDefinition, radioDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the selectable-box element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSelectableBox = createRegisterFunction(
	selectableBoxDefinition
);
