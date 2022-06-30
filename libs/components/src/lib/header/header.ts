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
	 * header elevation shadow
	 *
	 * @public
	 */
	@attr({ attribute: 'elevation-shadow', mode: 'boolean' }) elevationShadow?: boolean;

	/**
	 * applies scheme alternate to header region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;
}
