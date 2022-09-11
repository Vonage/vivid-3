import { applyMixins, MenuItem as FastMenuItem } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Base class for menu-item
 *
 * @public
 */
export class MenuItem extends FastMenuItem {
	// @observable roleState?: MenuItemRole = this.role;

	// override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
	// 	super.attributeChangedCallback(name, oldValue, newValue);
	// 	if (name === 'role' && roleForMenuItem.hasOwnProperty(newValue)) {
	// 		this.roleState = newValue as MenuItemRole;
	// 		this.removeAttribute('role');
	// 	}
	// }
}

export interface MenuItem extends AffixIcon {}

applyMixins(MenuItem, AffixIcon);
