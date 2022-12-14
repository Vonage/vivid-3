import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import { ListboxOption } from './option';
import { ListboxOptionTemplate as template } from './option.template';
import styles from './option.scss';

/**
 * The listbox-option element.
 *
 * @internal
 */
export const listboxOption = ListboxOption.compose<FoundationElementDefinition>({
	baseName: 'option',
	template: template as any,
	styles
})();

export const listboxOptionElements = [listboxOption, ...iconElements, ...focusElements];

/**
 * Registers the listbox-option elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerOption = registerFactorial(listboxOptionElements);
