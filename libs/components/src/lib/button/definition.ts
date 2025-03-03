import { iconDefinition } from '../icon/definition';
import { progressRingDefinition } from '../progress-ring/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Button } from './button';
import styles from './button.scss?inline';
import { buttonTemplate as template } from './button.template';

export type {
	ButtonAppearance,
	ButtonConnotation,
	ButtonShape,
	ButtonSize,
} from './button';

/**
 * @internal
 */
export const buttonDefinition = defineVividComponent(
	'button',
	Button,
	template,
	[iconDefinition, progressRingDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the button elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerButton = createRegisterFunction(buttonDefinition);

export { Button as VwcButtonElement };
