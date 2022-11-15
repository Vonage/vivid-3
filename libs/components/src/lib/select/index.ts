import '../popup';
import '../icon';
import '../listbox';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './select.scss';

import { Select } from './select';
import { SelectTemplate as template } from './select.template';

export const vividSelect = Select.compose<FoundationElementDefinition>({
	baseName: 'select',
	template: template as any,
	styles,
	//! unnecessary when host is focusable
	// shadowOptions: {
	// 	delegatesFocus: true,
	// },
});

designSystem.register(vividSelect());
