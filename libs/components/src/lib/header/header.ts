import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for header
 *
 * @public
 */
export class Header extends FoundationElement {
	/**
	 * header elevation shadow
	 *
	 * @public
	 */
	@attr({
		attribute: 'elevation-shadow',
		mode: 'boolean'
	}) elevationShadow = false;

	/**
	 * applies scheme alternate to header region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;
}
