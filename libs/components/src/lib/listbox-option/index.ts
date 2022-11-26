import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import { ListboxOption } from './listbox-option';
import { ListboxOptionTemplate as template } from './listbox-option.template';
import styles from './listbox-option.scss';

const prefix = getPrefix(import.meta.url);

loadComponentsModules(['icon', 'focus'], prefix);

export const vividListboxOption = ListboxOption.compose<FoundationElementDefinition>({
	baseName: 'option',
	template: template as any,
	styles
});

designSystem.withPrefix(prefix).register(vividListboxOption());
