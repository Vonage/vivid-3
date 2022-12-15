import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { Focus } from './focus';
import styles from './focus.scss';
import { focusTemplate as template } from './focus.template';


/**
 * Represents a focus custom element.
 * focus is a label that holds small amounts of information.
 * A focus can be used to display unread notifications, or to label a block of text.
 * Focuss don’t work for navigation because they can't include a hyperlink.
 *
 * @internal
 */
export const focusDefinition = Focus.compose<FoundationElementDefinition>({
	baseName: 'focus',
	template: template as any,
	styles,
});

export const focusRegistries = [focusDefinition()];

/**
 * Registers the focus component
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFocus = registerFactory(focusRegistries);
