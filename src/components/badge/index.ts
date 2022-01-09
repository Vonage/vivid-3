import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import styles from './badge.scss';
import { Badge } from './badge';
import { badgeTemplate as template } from './badge.template';

import { designSystem } from '../../core/design-system';

/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information.
 * A badge can be used to display unread notifications, or to label a block of text.
 * Badges don’t work for navigation because they can't include a hyperlink.
 */

export const VIVIDBadge = Badge.compose<FoundationElementDefinition>({
	baseName: 'badge',
	template: template as any,
	styles,
});

designSystem.register(VIVIDBadge());
