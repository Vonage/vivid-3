import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';

/**
 * An empty state element. Used when there is no data to display to the user.
 *
 * @public
 * @component empty-state
 * @slot - The default slot controls the body text of the empty state
 * @slot graphic - The graphic slot allows overriding the icon with a custom illustration
 * @slot action-items - Slot to add action items to the empty state
 */

/**
 * Types of badge connotation.
 *
 * @public
 */
export type EmptyStateConnotation = Extract<
	Connotation,
	| Connotation.Accent
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Information
>;

export class EmptyState extends FoundationElement {
	/**
	 * The connotation the empty state should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: EmptyStateConnotation;
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
	 * option to a new design for the icon circle
	 *
	 * @public
	 * HTML Attribute: icon-design
	 */
	@attr({ mode: 'boolean', attribute: 'icon-design' }) iconDesign = false;

	/**
	 * The action items to display in the empty state.
	 * @internal
	 */
	@observable slottedActionItems?: Node[];
}
