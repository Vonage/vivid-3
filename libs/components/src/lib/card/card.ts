import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable} from '@microsoft/fast-element';

/**
 * Base class for card
 *
 * @public
 * @slot graphic - The graphic slot overrides the icon property.
 * @slot media - The media slot is mainly for images or video content above the card header.
 * @slot meta - The meta slot is for action content in the card header.
 * @slot footer - The footer slot is for content in the card footer.
 * @slot main - Assign nodes to main slot to fully override a card's predefined flow and style with your own.
 */
export class Card extends FoundationElement {

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
	 *
	 * Slot observer:
	 *
	 * @internal
	 */


	@observable footerSlottedContent?: HTMLElement[];
	@observable graphicSlottedContent?: HTMLElement[];
	@observable hasMetaSlottedContent?: HTMLElement[];

}



