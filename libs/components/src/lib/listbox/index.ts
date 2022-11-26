import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import { Listbox } from './listbox';
import { ListboxTemplate as template } from './listbox.template';
import styles from './listbox.scss';

const prefix = getPrefix(import.meta.url);

// by convention, listbox-option isn't required to be imported
// in listbox as it is not used directly in its template rather by user's authoring.
// but, due to the race condition and way listbox needs children to
// connect before setting/checking their props/attributes, it is required
await loadComponentsModules(['listbox-option', 'focus'], prefix);

export const vividListbox = Listbox.compose<FoundationElementDefinition>({
	baseName: 'listbox',
	template: template as any,
	styles
});

designSystem.withPrefix(prefix).register(vividListbox());
