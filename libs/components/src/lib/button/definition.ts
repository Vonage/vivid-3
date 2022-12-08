import {
	Button as FastButton,
	type FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { icon } from '../icon/definition';
import { focus } from '../focus/definition';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';


const button = Button.compose<FoundationElementDefinition>({
	baseName: 'button',
	baseClass: FastButton,
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();


export const buttonElements = [button, icon, focus];

/**
 * Registers the button component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerButton = registerFactorial(...buttonElements);
