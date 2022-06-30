import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for header
 *
 * @public
 */
export class Header extends FoundationElement {
	/**
	 *
	 *headerEl
	 *
	 * @public
	 *
	 * HTML Attribute: heading
	 */
	@attr heading?: string;

	/**
	 * card elevation dp
	 *
	 * @public
	 */
	@attr elevation?: 0 | 2 | 4 | 8 | 12 | 16 | 24;

	/**
	 * applies scheme alternate to header region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;
}
