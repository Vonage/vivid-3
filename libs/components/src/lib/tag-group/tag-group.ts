import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for tag-group
 *
 * @public
 * @slot - The content of the tag-group.
 */
export class TagGroup extends FoundationElement {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
}
