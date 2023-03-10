import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { Badge } from './badge';
import styles from './badge.scss';
import { badgeTemplate as template } from './badge.template';

export type { BadgeConnotation, BadgeAppearance, BadgeShape } from './badge'

/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information.
 * A badge can be used to display unread notifications, or to label a block of text.
 */
export const badgeDefinition = Badge.compose<FoundationElementDefinition>({
	baseName: 'badge',
	template: template as any,
	styles,
});

const badgeRegistries = [badgeDefinition(), ...iconRegistries];
/**
 * Registers the badge elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBadge = registerFactory(badgeRegistries);
