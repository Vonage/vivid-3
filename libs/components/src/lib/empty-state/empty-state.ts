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
	 * The connotation the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: EmptyStateConnotation;
	/**
	 * An optional headline for the empty state.
	 *
	 * @public
	 */
	@attr headline?: string;

	/**
	 * A decorative icon the Empty State should have. See the [Vivid Icon
	 * Gallery](/icons/icons-gallery/) for available icons and `icon-name`s
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * Has no effect on the component
	 *
	 * @deprecated deprecated
	 *
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
