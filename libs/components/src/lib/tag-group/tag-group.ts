import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * @public
 * @component tag-group
 * @slot - The content of the tag-group.
 */
export class TagGroup extends FoundationElement {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
}
