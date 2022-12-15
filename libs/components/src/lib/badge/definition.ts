import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { Badge } from './badge';
import styles from './badge.scss';
import { badgeTemplate as template } from './badge.template';
import { elements } from './elements';


/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information.
 * A badge can be used to display unread notifications, or to label a block of text.
 * Badges don’t work for navigation because they can't include a hyperlink.
 */
export const badgeDefinition = Badge.compose<FoundationElementDefinition>({
	baseName: 'badge',
	template: template as any,
	styles,
});

/**
 * Registers the badge elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBadge = registerFactorial(elements);
