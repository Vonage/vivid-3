import '../popup';
// by convention, menu-item isn't required to be imported
// in menu as it is not used directly in template rather by authoring.
// but, due to the race condition and way menu needs children to
// connect before setting/checking their props/attributes, it is required
import '../menu-item';

import { designSystem } from '../../shared/design-system';
import styles from './menu.scss';
import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';


export const vividMenu = Menu.compose({
	baseName: 'menu',
	template: template as any,
	styles,
});

designSystem.register(vividMenu());
