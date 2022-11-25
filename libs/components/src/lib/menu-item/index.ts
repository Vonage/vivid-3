import '../icon';

import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './menu-item.scss';

import { MenuItem } from './menu-item';
import { MenuItemTemplate as template } from './menu-item.template';

export const vividMenuItem = MenuItem.compose<MenuItemOptions>({
	baseName: 'menu-item',
	template: template as any,
	styles
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividMenuItem());
