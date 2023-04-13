import { observable } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

/**
 * Base class for tag-group
 *
 * @public
 */
export class TagGroup extends FoundationElement {
	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */

	@observable slottedTags?: HTMLElement[];
}
