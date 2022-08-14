import {
	MenuItem,
	type MenuItemOptions
} from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { MenuItemTemplate as template } from './menu-item.template';
import styles from './menu-item.scss';


export const vividMenuItem =MenuItem.compose<MenuItemOptions>({
	baseName: 'menu-item',
	template: template as any,
	styles,
	expandCollapseGlyph: '...default expand/collapse glyph...',
	checkboxIndicator: '...default checkbox indicator...',
	radioIndicator: '...default radio indicator...',
});

designSystem.register(vividMenuItem());
