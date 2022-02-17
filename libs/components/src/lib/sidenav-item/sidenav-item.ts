import { applyMixins } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { Anchor } from '@microsoft/fast-foundation';
import { Affix } from '../patterns/affix';

/**
 * A Sidenav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class SidenavItem extends Anchor {
	/**
	 * Indicates the sidenav item's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text = '';
}

export interface SidenavItem extends Affix {}
applyMixins(SidenavItem, Affix);
