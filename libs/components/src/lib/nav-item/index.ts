import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './nav-item.scss';

import { NavItem } from './nav-item';
import { NavItemTemplate as template } from './nav-item.template';

export const vividNavItem =
	NavItem.compose<FoundationElementDefinition>({
		baseName: 'nav-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividNavItem());
