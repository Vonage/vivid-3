import {
	Button as FastButton,
	type FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import { progressRingRegistries } from '../progress-ring/definition';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';

export type { ButtonAppearance, ButtonConnotation, ButtonShape, ButtonSize } from './button';

/**
 *
 * @internal
 */
export const buttonDefinition = Button.compose<FoundationElementDefinition>({
	baseName: 'button',
	baseClass: FastButton,
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});


/**
 * @internal
 */
export const buttonRegistries = [buttonDefinition(), ...iconRegistries, ...focusRegistries, ...progressRingRegistries];

/**
 * Registers the button elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerButton = registerFactory(buttonRegistries);
