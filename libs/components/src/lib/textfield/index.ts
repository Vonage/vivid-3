import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { Textfield } from './textfield';
import styles from './textfield.scss';
import { TextfieldTemplate as template } from './textfield.template';

export const vividTextfield = Textfield.compose<FoundationElementDefinition>({
	baseName: 'textfield',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividTextfield());
