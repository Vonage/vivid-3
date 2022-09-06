import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';

import styles from './text-area.scss';
import { TextArea } from './text-area';
import { TextAreaTemplate as template } from './text-area.template';

export const vividTextArea = TextArea.compose<FoundationElementDefinition>({
	baseName: 'text-area',
	template: template as any,
	styles,
});

designSystem.register(vividTextArea());
