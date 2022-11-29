import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './menu-item.scss';

import { MenuItem } from './menu-item';
import { MenuItemTemplate as template } from './menu-item.template';

const prefix = getPrefix(import.meta.url);

export const vividMenuItem = MenuItem.compose<MenuItemOptions>({
	baseName: 'menu-item',
	template: template as any,
	styles
});

(async () => {
	await loadComponentsModules(['icon', 'focus'], prefix);
	designSystem.withPrefix(prefix).register(vividMenuItem());
})();
