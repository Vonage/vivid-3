import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './menu.scss';
import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';

const prefix = getPrefix(import.meta.url);

// by convention, menu-item isn't required to be imported
// in menu as it is not used directly in template, rather by user's authoring.
// but, due to the race condition and way menu needs children to
// connect before setting/checking their props/attributes, it is required

export const vividMenu = Menu.compose({
	baseName: 'menu',
	template: template as any,
	styles,
});

(async () => {
	await loadComponentsModules(['popup', 'menu-item'], prefix);
	designSystem.withPrefix(prefix).register(vividMenu());
})();
