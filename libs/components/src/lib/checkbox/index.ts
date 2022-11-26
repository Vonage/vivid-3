import type { CheckboxOptions } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './checkbox.scss';

import { Checkbox } from './checkbox';
import { CheckboxTemplate as template } from './checkbox.template';

const prefix = getPrefix(import.meta.url);

loadComponentsModules(['icon', 'focus'], prefix);

export const vividCheckbox = Checkbox.compose<CheckboxOptions>({
	baseName: 'checkbox',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.withPrefix(prefix).register(vividCheckbox());
