import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * @public
 * @component header
 * @slot - Default slot.
 * @slot action-items - Nodes assigned to action-items slot will be set at the end of the header.
 * @slot app-content - Content vertically aligned with header.
 */
export class Header extends FoundationElement {
	/**
	 * header elevation shadow
	 *
	 * @public
	 */
	@attr({
		attribute: 'elevation-shadow',
		mode: 'boolean',
	})
	elevationShadow = false;

	/**
	 * applies scheme alternate to header region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	})
	alternate = false;
}
