import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { dividerRegistries } from '../divider/definition';
import styles from './number-field.scss';
import { NumberField } from './number-field';
import { NumberFieldTemplate as template } from './number-field.template';


/**
 * The number-field element.
 */
export const numberField =
	NumberField.compose<FoundationElementDefinition>({
		baseName: 'number-field',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

export const numberFieldElement = [numberField(), ...buttonRegistries, ...dividerRegistries];

/**
 * Registers the number-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNumberField = registerFactory(numberFieldElement);
