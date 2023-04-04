import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import { Tag } from './tag';
import styles from './tag.scss';
import { tagTemplate as template } from './tag.template';

export type { TagConnotation, TagAppearance, TagShape } from './tag';

/**
 * Represents a tag custom element.
 * tag is a label that holds small amounts of information.
 * A tag can be used to display unread notifications, or to label a block of text.
 */
export const tagDefinition = Tag.compose<FoundationElementDefinition>({
	baseName: 'tag',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

const tagRegistries = [tagDefinition(), ...iconRegistries, ...focusRegistries];
/**
 * Registers the tag elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTag = registerFactory(tagRegistries);
