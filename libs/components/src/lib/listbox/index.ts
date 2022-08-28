import '../focus';
import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { Listbox } from './listbox';
import { ListboxTemplate as template } from './listbox.template';

export const vividListbox = Listbox.compose<FoundationElementDefinition>({
	baseName: 'listbox',
	template: template as any,
});

designSystem.register(vividListbox());
