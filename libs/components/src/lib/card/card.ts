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

	/**
	 * card elevation dp
	 *
	 * @public
	 */
	@attr dp?: 0 | 2 | 4 | 8 | 12 | 16 | 24; // TODO: get values from design tokens
}

