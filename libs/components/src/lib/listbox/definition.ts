import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { focusElements } from '../focus/definition';
import { listboxOptionElements } from '../option/definition';
import { Listbox } from './listbox';
import { ListboxTemplate as template } from './listbox.template';
import styles from './listbox.scss';


/**
 * The calendar-event element is a custom element that is used to display a single event in a calendar.
 *
 * @internal
 */
const listbox = Listbox.compose<FoundationElementDefinition>({
	baseName: 'listbox',
	template: template as any,
	styles
})();

// by convention, option isn't required to be imported
// in listbox as it is not used directly in its template rather by user's authoring.
// but, due to the race condition and way listbox needs children to
// connect before setting/checking their props/attributes, it is required
export const listboxElements = [listbox, ...listboxOptionElements, ...focusElements];

/**
 * Registers the listbox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerListbox = registerFactorial(listboxElements);
