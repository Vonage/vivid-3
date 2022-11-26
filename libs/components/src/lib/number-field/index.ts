import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './number-field.scss';
import { NumberField } from './number-field';
import { NumberFieldTemplate as template } from './number-field.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['button', 'divider'], prefix);

export const vividNumberField =
	NumberField.compose<FoundationElementDefinition>({
		baseName: 'number-field',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

designSystem.withPrefix(prefix).register(vividNumberField());



