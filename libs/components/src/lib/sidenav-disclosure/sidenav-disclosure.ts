import { attr } from '@microsoft/fast-element';
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * A Sidenav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class SidenavDisclosure extends FoundationElement {
	/**
	 *
	 * @public
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates whether the sidenav-disclosure is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

}

export interface SidenavDisclosure extends AffixIcon { }
applyMixins(SidenavDisclosure, AffixIcon);