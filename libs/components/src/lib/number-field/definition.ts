import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { dividerRegistries } from '../divider/definition';
import styles from './number-field.scss';
import { NumberField } from './number-field';
import { NumberFieldTemplate as template } from './number-field.template';

export type { NumberFieldAppearance, NumberFieldShape } from './number-field';

/**
 * The number-field element.
 */
export const numberFieldDefinition =
	NumberField.compose<FoundationElementDefinition>({
		baseName: 'number-field',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

export const numberFieldRegistries = [numberFieldDefinition(), ...buttonRegistries, ...dividerRegistries];

/**
 * Registers the number-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNumberField = registerFactory(numberFieldRegistries);
