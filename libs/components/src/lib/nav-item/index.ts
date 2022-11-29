import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './nav-item.scss';

import { NavItem } from './nav-item';
import { NavItemTemplate as template } from './nav-item.template';

const prefix = getPrefix(import.meta.url);

export const vividNavItem =
	NavItem.compose<FoundationElementDefinition>({
		baseName: 'nav-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

( async () => {
	await loadComponentsModules(['icon', 'focus'], prefix);
	designSystem.withPrefix(prefix).register(vividNavItem());
})();
