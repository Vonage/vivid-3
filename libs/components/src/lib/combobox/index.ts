import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import textFieldStyles from '../text-field/text-field.scss';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './combobox.scss';

import { Combobox } from './combobox';
import { comboboxTemplate as template } from './combobox.template';

const prefix = getPrefix(import.meta.url);

export const vividCombobox = Combobox.compose<FoundationElementDefinition>({
	baseName: 'combobox',
	template: template as any,
	styles: [textFieldStyles, styles],
	shadowOptions: {
		delegatesFocus: true,
	},
});

(async () => {
	await loadComponentsModules(['icon', 'option', 'popup', 'focus'], prefix);
	designSystem.withPrefix(prefix).register(vividCombobox());
})();