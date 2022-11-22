import { attr } from '@microsoft/fast-element';
import { applyMixins, Tab as FoundationTab } from '@microsoft/fast-foundation';
import { AffixIcon, AffixIconWithTrailing } from '../../shared/patterns/affix';
import type { Connotation, Shape } from '../enums.js';

/**
 * Types of badge connotation.
 *
 * @public
 */
type TabConnotation = Extract<Connotation, Connotation.Accent | Connotation.Information>;

/**
* Types of badge shape.
*
* @public
*/
type TabShape = Extract<Shape, Shape.Rounded | Shape.Sharp>;

/**
 * Base class for tab
 *
 * @public
 */
export class Tab extends FoundationTab {
	/**
	 * The connotation the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TabConnotation;

	/**
	 * The shape the badge should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: TabShape;
	/**
	 * Indicates the tab's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	@attr({ attribute: 'aria-selected' }) override ariaSelected: string | null = null;
}

export interface Tab extends AffixIconWithTrailing { }
applyMixins(Tab, AffixIcon);
