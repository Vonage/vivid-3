import { html } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';
import { TextAnchor } from '../text-anchor/text-anchor';

/**
 * A Nav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 * @component nav-item
 * @slot meta - A slot to add additional content to the nav item.
 * @slot icon - Add an icon to the component.
 */
export class NavItem extends AffixIcon(TextAnchor) {
	override getBodyTemplate() {
		return html<NavItem>`<slot name="meta"></slot>`;
	}
}
