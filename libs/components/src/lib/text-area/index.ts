import '../focus';
import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';

import styles from './text-area.scss';
import { TextArea } from './text-area';
import { TextAreaTemplate as template } from './text-area.template';

export const vividTextArea = TextArea.compose<FoundationElementDefinition>({
	baseName: 'text-area',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividTextArea());
