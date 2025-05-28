import { attr } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';
import { Linkable } from '../../shared/patterns/linkable';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Appearance, Connotation } from '../enums';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of nav item connotation.
 *
 * @public
 */
export type NavItemConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of nav item appearance.
 *
 * @public
 */
export type NavItemAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Ghost | Appearance.GhostLight
>;

/**
 * A Nav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 * @component nav-item
 * @slot meta - A slot to add additional content to the nav item.
 * @slot icon - Add an icon to the component.
 */
export class NavItem extends AffixIcon(Linkable(VividElement)) {
	/**
	 * Text of the nav item
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;

	/**
	 * Sets the connotation color of the selected nav item
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: NavItemConnotation;

	/**
	 * Sets the nav item's appearance
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: NavItemAppearance;
}
