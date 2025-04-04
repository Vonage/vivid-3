import { attr, observable } from '@microsoft/fast-element';
import type { Connotation, IconDecoration } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of empty-state connotation.
 *
 * @public
 */
export type EmptyStateConnotation = ExtractFromEnum<
	Connotation,
	| Connotation.Accent
	| Connotation.CTA
	| Connotation.Success
	| Connotation.Alert
	| Connotation.Warning
	| Connotation.Information
>;

/**
 * Types of empty-state IconDecoration
 *
 * @public
 */
export type EmptyStateIconDecoration = ExtractFromEnum<
	IconDecoration,
	IconDecoration.Filled | IconDecoration.Outlined
>;

/**
 * An empty state element. Used when there is no data to display to the user.
 *
 * @public
 * @component empty-state
 * @slot - The default slot controls the body text of the empty state
 * @slot graphic - The graphic slot allows overriding the icon with a custom illustration
 * @slot action-items - Slot to add action items to the empty state
 */
export class EmptyState extends VividElement {
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
	 * HTML Attribute: icon-decoration
	 */
	@attr({ attribute: 'icon-decoration' })
	iconDecoration?: EmptyStateIconDecoration;

	/**
	 * The action items to display in the empty state.
	 * @internal
	 */
	@observable slottedActionItems?: Node[];
}
