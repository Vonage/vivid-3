import '../text-field';
import '../popup';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './combobox.scss';

import { Combobox } from './combobox';
import { ComboboxTemplate as template } from './combobox.template';



export const vividCombobox = Combobox.compose<FoundationElementDefinition>({
	baseName: 'combobox',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividCombobox());
