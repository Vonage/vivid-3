import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { iconDefinition } from '../icon/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { Badge } from './badge';
import styles from './badge.scss?inline';
import { badgeTemplate as template } from './badge.template';

export type { BadgeConnotation, BadgeAppearance, BadgeShape } from './badge';

/**
 * @internal
 */
export const badgeDefinition = defineVividComponent(
	'badge',
	Badge,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the badge elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerBadge = createRegisterFunction(badgeDefinition);

export { Badge as VwcBadgeElement };
