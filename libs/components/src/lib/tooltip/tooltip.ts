import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';

/**
 * Base class for tooltip
 *
 * @public
 */
export class Tooltip extends FoundationElement {
	/**
	 * the text of the tooltip
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	/**
	 * indicates whether the tooltip is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

	/**
	 * the placement of the tooltip
	 *
	 * @public
	 * HTML Attribute: corner
	 */
	@attr corner?: Placement;

	/**
	 * ID reference to element in the tooltip's owner document.
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr anchor?: string;
}
