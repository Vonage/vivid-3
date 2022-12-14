import { registerFactorial } from '../../shared/design-system';
import { popupElements } from '../popup/definition';
import { menuItemElements } from '../menu-item/definition';
import styles from './menu.scss';
import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';

/**
 * The menu element is a custom element that is used to display a list of menu items.
 *
 * @internal
 */
export const menu = Menu.compose({
	baseName: 'menu',
	template: template as any,
	styles,
})();


// by convention, menu-item isn't required to be imported
// in menu as it is not used directly in template, rather by user's authoring.
// but, due to the race condition and way menu needs children to
// connect before setting/checking their props/attributes, it is required
export const menuElements = [menu, ...popupElements, ...menuItemElements];

/**
 * Registers the calendar-event elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenu = registerFactorial(menuElements);
