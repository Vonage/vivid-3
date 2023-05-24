import { FoundationElement } from '@microsoft/fast-foundation';
import {attr, observable} from '@microsoft/fast-element';

/**
 * An empty state element. Used when there is no data to display to the user.
 * @slot - The default slot controls the body text of the empty state
 * @slot graphic - The graphic slot allows overriding the icon with a custom illustration
 * @slot action-items - Slot to add action items to the empty state
 */
export class EmptyState extends FoundationElement {
	/**
	 * An optional headline for the empty state.
	 * @public
	 */
	@attr headline?: string;

	/**
	 * Icon for the empty state.
	 * @public
	 */
	@attr icon?: string;

	/**
	 * The action items to display in the empty state.
	 * @internal
	 */
	@observable slottedActionItems?: Node[];
}
