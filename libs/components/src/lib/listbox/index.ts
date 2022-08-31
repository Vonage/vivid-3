import '../focus';
import '../icon';
import '../listbox-option';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { Listbox } from './listbox';
import { ListboxTemplate as template } from './listbox.template';
import styles from './listbox.scss';

export const vividListbox = Listbox.compose<FoundationElementDefinition>({
	baseName: 'listbox',
	template: template as any,
	styles
});

designSystem.register(vividListbox());
