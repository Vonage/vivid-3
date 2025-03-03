import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { SplitButton } from './split-button';
import styles from './split-button.scss?inline';
import { SplitButtonTemplate as template } from './split-button.template';

export type {
	SplitButtonAppearance,
	SplitButtonConnotation,
	SplitButtonShape,
	SplitButtonSize,
} from './split-button';

/**
 * @internal
 */
export const splitButtonDefinition = defineVividComponent(
	'split-button',
	SplitButton,
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
 * Registers the button elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSplitButton = createRegisterFunction(
	splitButtonDefinition
);

export { SplitButton as VwcSplitButtonElement };
