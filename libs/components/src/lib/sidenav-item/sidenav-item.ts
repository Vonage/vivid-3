import { applyMixins } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { Anchor } from '@microsoft/fast-foundation';
import { Prefix } from '../../shared/patterns/affix';
import type { Appearance, Connotation } from '../enums';

/**
 * Types of sidenav item connotation.
 *
 * @public
 */
type SidenavItemConnotation = Extract<Connotation, Connotation.Primary>;

/**
 * Types of sidenav item appearance.
 *
 * @public
 */
export type SidenavItemAppearance = Extract<Appearance, Appearance.Ghost>;


/**
 * A Sidenav Item Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @public
 */
export class SidenavItem extends Anchor {
	/**
	 * The connotation the sidenav item should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SidenavItemConnotation;

	/**
	 * The appearance the sidenav item should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: SidenavItemAppearance;

	/**
	 * Indicates the sidenav item's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text = '';
}

export interface SidenavItem extends Prefix {}
applyMixins(SidenavItem, Prefix);
