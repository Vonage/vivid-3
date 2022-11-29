import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import { Badge } from './badge';
import styles from './badge.scss';
import { badgeTemplate as template } from './badge.template';

const prefix = getPrefix(import.meta.url);

/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information.
 * A badge can be used to display unread notifications, or to label a block of text.
 * Badges don’t work for navigation because they can't include a hyperlink.
 */

export const vividBadge = Badge.compose<FoundationElementDefinition>({
	baseName: 'badge',
	template: template as any,
	styles,
});

(async () => {
	await loadComponentsModules(['icon'], prefix);
	designSystem.withPrefix(prefix).register(vividBadge());
})();
