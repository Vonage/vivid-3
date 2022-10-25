import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { ListboxOption } from './option';
import { ListboxOptionTemplate as template } from './option.template';
import styles from './option.scss';

export const vividListboxOption = ListboxOption.compose<FoundationElementDefinition>({
	baseName: 'option',
	template: template as any,
	styles
});

designSystem.register(vividListboxOption());
