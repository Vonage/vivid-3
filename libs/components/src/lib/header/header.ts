import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

/**
 * @public
 * @component header
 * @slot - Default slot.
 * @slot action-items - Nodes assigned to action-items slot will be set at the end of the header.
 * @slot app-content - Content vertically aligned with header.
 */
export class Header extends DelegatesAria(VividElement) {
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
