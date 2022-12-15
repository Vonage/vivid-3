import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import { ListboxOption } from './option';
import { ListboxOptionTemplate as template } from './option.template';
import styles from './option.scss';

/**
 * The listbox-option element.
 */
export const listboxOptionDefinition = ListboxOption.compose<FoundationElementDefinition>({
	baseName: 'option',
	template: template as any,
	styles
});

/**
 * @internal
 */
export const listboxOptionRegistries = [listboxOptionDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the listbox-option elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerOption = registerFactory(listboxOptionRegistries);
