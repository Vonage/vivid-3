import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component tag-group
 * @slot - The content of the tag-group.
 */
export class TagGroup extends VividElement {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
}
