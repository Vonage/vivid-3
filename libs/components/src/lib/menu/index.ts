import '../popup';
// by convention, menu-item isn't required to be imported
// in menu as it is not used directly rather by authoring.
// but, due to the race condition and way menu needs children to
// connect before setting/checking their props/attributes, it is required
import '../menu-item';

import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './menu.scss';
import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';


export const vividMenu = Menu.compose({
	baseName: 'menu',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividMenu());
