import { Disclosure as FoundationDisclosure } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { applyMixins } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * A Sidenav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class Disclosure extends FoundationDisclosure {
	/**
	 *
	 * @public
	 * HTML Attribute: label
	 */
	@attr label?: string;
}

export interface Disclosure extends AffixIcon { }
applyMixins(Disclosure, AffixIcon);