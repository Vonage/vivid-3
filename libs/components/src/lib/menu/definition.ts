import { registerFactory } from '../../shared/design-system';
import { popupRegistries } from '../popup/definition';
import { menuItemRegistries } from '../menu-item/definition';
import styles from './menu.scss';
import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';

export type { Placement } from '@floating-ui/dom';

/**
 * The menu element is a custom element that is used to display a list of menu items.
 */
export const menuDefinition = Menu.compose({
	baseName: 'menu',
	template: template as any,
	styles,
});


// by convention, menu-item isn't required to be imported
// in menu as it is not used directly in template, rather by user's authoring.
// but, due to the race condition and way menu needs children to
// connect before setting/checking their props/attributes, it is required
/**
 * @internal
 */
export const menuRegistries = [menuDefinition(), ...popupRegistries, ...menuItemRegistries];

/**
 * Registers the calendar-event elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenu = registerFactory(menuRegistries);
