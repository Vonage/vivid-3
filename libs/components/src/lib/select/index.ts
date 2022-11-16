import '../popup';
import '../icon';
// import '../listbox'; //! not using the component
// by convention, listbox-option isn't required to be imported
// in combobox as it is not used directly in template rather by authoring.
// but, due to the race condition and way combobox needs children to
// connect before setting/checking their props/attributes, it is required
import '../listbox-option';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './select.scss';

import { Select } from './select';
import { SelectTemplate as template } from './select.template';

export const vividSelect = Select.compose<FoundationElementDefinition>({
	baseName: 'select',
	template: template as any,
	styles,
});

designSystem.register(vividSelect());
