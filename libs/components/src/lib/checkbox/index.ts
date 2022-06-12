import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './checkbox.scss';

import { Checkbox } from './checkbox';
import { CheckboxTemplate as template } from './checkbox.template';

export const vividCheckbox = Checkbox.compose<FoundationElementDefinition>({
	baseName: 'checkbox',
	template: template as any,
	styles,
});

designSystem.register(vividCheckbox());
