import { attr, observable } from '@microsoft/fast-element';
import type { Appearance } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

/**
 * Types of card appearance.
 *
 * @public
 */
export type CardAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Elevated | Appearance.Ghost | Appearance.Outlined
>;

/**
 * @public
 * @component card
 * @slot graphic - The graphic slot overrides the icon property.
 * @slot media - The media slot is mainly for images or video content above the card header.
 * @slot meta - The meta slot is for action content in the card header.
 * @slot footer - The footer slot is for content in the card footer.
 * @slot main - Assign nodes to main slot to fully override a card's predefined flow and style with your own.
 */

export class Card extends DelegatesAria(VividElement) {
	/**
	 * The appearance the card should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: CardAppearance;

	/**
	 * the text of the card heading
	 * accepts string
	 *
	 * @public
	 */
	@attr headline?: string;

	/**
	 * the text of the card sub-heading
	 * accepts string
	 *
	 * @public
	 */
	@attr subtitle?: string;

	/**
	 * the text of the card sub-heading
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	/**
	 * card header icon
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * card elevation dp
	 *
	 * @public
	 */
	@attr elevation?: 0 | 2 | 4 | 8 | 12 | 16 | 24;

	/**
	 * Indicates whether card should be a clickable <button> element.
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
		attribute: 'clickable-card',
	})
	clickableCard = false;

	/**
	 * Type of a <button> element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: type
	 */
	@attr type?: string;

	/**
	 * Indicates the card's href.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: href
	 */
	@attr href?: string;

	/**
	 * Indicates the card's download.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: download
	 */
	@attr download?: string;

	/**
	 * Indicates the card's hreflang.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: hreflang
	 */
	@attr hreflang?: string;

	/**
	 * Indicates the card's ping.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: ping
	 */
	@attr ping?: string;

	/**
	 * Indicates the card's referrerpolicy.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: referrerpolicy
	 */
	@attr referrerpolicy?: string;

	/**
	 * Indicates the card's rel.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: rel
	 */
	@attr rel?: string;

	/**
	 * Indicates the card's target.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: target
	 */
	@attr target?: '_self' | '_blank' | '_parent' | '_top';

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */

	@observable footerSlottedContent?: HTMLElement[];
	@observable graphicSlottedContent?: HTMLElement[];
	@observable hasMetaSlottedContent?: HTMLElement[];
}
