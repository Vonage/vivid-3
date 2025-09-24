import { buttonDefinition } from '../button/definition';
import { textFieldDefinition } from '../text-field/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { iconDefinition } from '../icon/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { visuallyHiddenDefinition } from '../visually-hidden/definition';
import styles from './dial-pad.scss?inline';
import { DialPad } from './dial-pad';
import { DialPadTemplate as template } from './dial-pad.template';

/**
 * @internal
 */
export const dialPadDefinition = defineVividComponent(
	'dial-pad',
	DialPad,
	template,
	[
		buttonDefinition,
		textFieldDefinition,
		iconDefinition,
		visuallyHiddenDefinition,
	],
	{
		styles,
	}
);

/**
 * Registers the dial-pad element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDialPad = createRegisterFunction(dialPadDefinition);

export { DialPad as VwcDialPadElement };
