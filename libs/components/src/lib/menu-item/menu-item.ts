import { attr } from '@microsoft/fast-element';
import { applyMixins, MenuItem as FastMenuItem } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Base class for menu-item
 *
 * 
 */
export class MenuItem extends FastMenuItem {
	/**
	 * Indicates the menu item's text.
	 *
	 * 
	 * 
	 * HTML Attribute: text
	 */
	@attr text?: string;
}

export interface MenuItem extends AffixIcon {}

applyMixins(MenuItem, AffixIcon);
