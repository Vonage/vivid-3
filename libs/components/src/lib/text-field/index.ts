import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { TextField } from './text-field';
import styles from './text-field.scss';
import { TextfieldTemplate as template } from './text-field.template';

export const vividTextfield = TextField.compose<FoundationElementDefinition>({
	baseName: 'text-field',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividTextfield());
