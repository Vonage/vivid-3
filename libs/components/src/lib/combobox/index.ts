// by convention, listbox-option isn't required to be imported
// in combobox as it is not used directly in template rather by authoring.
// but, due to the race condition and way combobox needs children to
// connect before setting/checking their props/attributes, it is required
import '../listbox-option';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import textFieldStyles from '../text-field/text-field.scss';
import styles from './combobox.scss';

import { Combobox } from './combobox';
import { comboboxTemplate as template } from './combobox.template';


export const vividCombobox = Combobox.compose<FoundationElementDefinition>({
	baseName: 'combobox',
	template: template as any,
	styles: [textFieldStyles, styles],
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividCombobox());
