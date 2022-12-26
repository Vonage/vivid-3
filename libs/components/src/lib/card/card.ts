import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable} from '@microsoft/fast-element';

/**
 * Base class for card
 *
 * 
 */
export class Card extends FoundationElement {

	/**
	 * the text of the card heading
	 * accepts string
	 *
	 * 
	 */
	@attr headline?: string;

	/**
	 * the text of the card sub - heading
	 * accepts string
	 *
	 * 
	 */
	@attr subtitle?: string;

	/**
	 * the text of the card sub - heading
	 * accepts string
	 *
	 * 
	 */
	@attr text?: string;

	/**
	 * card header icon
	 *
	 * 
	 */
	@attr icon?: string;

	/**
	 * card elevation dp
	 *
	 * 
	 */
	@attr elevation?: 0 | 2 | 4 | 8 | 12 | 16 | 24;



	/**
	 *
	 *
	 * 	 */
	@observable footerSlottedContent?: HTMLElement[];
	@observable graphicSlottedContent?: HTMLElement[];
	@observable hasMetaSlottedContent?: HTMLElement[];

}



