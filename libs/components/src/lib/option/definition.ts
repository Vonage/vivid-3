import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusElements } from '../focus/definition';
import { ListboxOption } from './option';
import { ListboxOptionTemplate as template } from './option.template';
import styles from './option.scss';

/**
 * The listbox-option element.
 *
 * @internal
 */
export const listboxOptionDefinition = ListboxOption.compose<FoundationElementDefinition>({
	baseName: 'option',
	template: template as any,
	styles
});

export const listboxOptionRegistries = [listboxOption(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the listbox-option elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerOption = registerFactory(listboxOptionRegistries);
