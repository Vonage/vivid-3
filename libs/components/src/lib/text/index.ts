import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './text.scss';

import { Text } from './text';
import { TextTemplate as template } from './text.template';

export const vividText = Text.compose<FoundationElementDefinition>({
	baseName: 'text',
	template: template as any,
	styles,
});

designSystem.register(vividText());
