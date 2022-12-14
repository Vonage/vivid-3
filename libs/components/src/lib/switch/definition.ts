import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './switch.scss';
import { Switch } from './switch';
import { SwitchTemplate as template } from './switch.template';


/**
 * The switch element.
 *
 * @internal
 */
export const switchCE = Switch.compose<FoundationElementDefinition>({
	baseName: 'switch',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	}
})();

export const switchElements = [switchCE, ...iconElements, ...focusElements];

/**
 * Registers the switch elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSwitch = registerFactorial(switchElements);
