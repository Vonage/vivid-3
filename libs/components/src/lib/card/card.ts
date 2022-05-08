import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable} from '@microsoft/fast-element';

/**
 * Base class for card
 *
 * @public
 */
export class Card extends FoundationElement {

	/**
	 * the text of the card heading
	 * accepts string
	 *
	 * @public
	 */
	@attr heading?: string;

	/**
	 * the text of the card sub-heading
	 * accepts string
	 *
	 * @public
	 */
	@attr subheading?: string;

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



