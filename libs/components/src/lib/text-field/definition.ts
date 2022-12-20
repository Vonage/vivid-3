import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { focusRegistries } from '../focus/definition';
import { iconRegistries } from '../icon/definition';
import { TextField } from './text-field';
import styles from './text-field.scss';
import { TextfieldTemplate as template } from './text-field.template';


/**
 * The text-field element.
 */
export const textFieldDefinition = TextField.compose<FoundationElementDefinition>({
	baseName: 'text-field',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const textFieldRegistries = [textFieldDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the text-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextField = registerFactory(textFieldRegistries);
