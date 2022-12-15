import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './switch.scss';
import { Switch } from './switch';
import { SwitchTemplate as template } from './switch.template';


/**
 * The switch element.
 *
 * @internal
 */
export const switchCEDefinition = Switch.compose<FoundationElementDefinition>({
	baseName: 'switch',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	}
});

export const switchRegistries = [switchCE(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the switch elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSwitch = registerFactory(switchRegistries);
