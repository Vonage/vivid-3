import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import { TextField } from './text-field';
import styles from './text-field.scss';
import { TextfieldTemplate as template } from './text-field.template';

const prefix = getPrefix(import.meta.url);

loadComponentsModules(['icon', 'focus'], prefix);

export const vividTextfield = TextField.compose<FoundationElementDefinition>({
	baseName: 'text-field',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.withPrefix(prefix).register(vividTextfield());

