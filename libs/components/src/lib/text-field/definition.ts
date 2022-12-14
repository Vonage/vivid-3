import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { focusElements } from '../focus/definition';
import { iconElements } from '../icon/definition';
import { TextField } from './text-field';
import styles from './text-field.scss';
import { TextfieldTemplate as template } from './text-field.template';


/**
 * The text-field element.
 *
 * @internal
 */
export const textField = TextField.compose<FoundationElementDefinition>({
	baseName: 'text-field',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();

export const textFieldElements = [textField, ...iconElements, ...focusElements];

/**
 * Registers the text-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextField = registerFactorial(textFieldElements);
