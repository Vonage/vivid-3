import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

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
	@attr({ mode: 'fromView' }) heading = '';

	/**
	 * the text of the card sub-heading
	 * accepts string
	 *
	 * @public
	 */
	@attr({ mode: 'fromView' }) subtitle = '';

	/**
	 * the text of the card sub-heading
	 * accepts string
	 *
	 * @public
	 */
	@attr({ mode: 'fromView' }) text = '';

	/**
	 * card header icon
	 *
	 * @public
	 */
	@attr icon?: string;
}

