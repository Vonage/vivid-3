import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './number-field.scss';
import '../button';
import '../divider';

import { NumberField } from './number-field';
import { NumberFieldTemplate as template } from './number-field.template';

export const vividNumberField =
	NumberField.compose<FoundationElementDefinition>({
		baseName: 'number-field',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

designSystem.register(vividNumberField());



