import {
	Button as FastButton,
	type FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';


/**
 *
 * @internal
 */
export const button = Button.compose<FoundationElementDefinition>({
	baseName: 'button',
	baseClass: FastButton,
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();


export const buttonElements = [button, ...iconElements, ...focusElements];

/**
 * Registers the button elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerButton = registerFactorial(buttonElements);
