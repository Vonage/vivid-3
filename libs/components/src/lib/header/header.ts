import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for header
 *
 * 
 */
export class Header extends FoundationElement {
	/**
	 * header elevation shadow
	 *
	 * 
	 */
	@attr({
		attribute: 'elevation-shadow',
		mode: 'boolean'
	}) elevationShadow = false;

	/**
	 * applies scheme alternate to header region
	 *
	 * 
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;
}
