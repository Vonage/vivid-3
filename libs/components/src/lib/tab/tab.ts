import { attr } from '@microsoft/fast-element';
import { applyMixins, Tab as FoundationTab } from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

import type { Connotation, Shape} from '../enums.js';

/**
 * Types of tab connotation.
 *
 * @public
 */
export type TabConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

/**
 * Types of avatar shape.
 *
 * @public
 */
export type TabShape = Extract<Shape, Shape.Rounded | Shape.Sharp>;

/**
 * Base class for tab
 *
 * @public
 */
export class Tab extends FoundationTab {
	/**
	 * The connotation the tab should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TabConnotation;
	/**
	 * The shape the tab should have.
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

	@attr({ mode: 'fromView' }) override tabIndex: any = '-1';

	@attr({ attribute: 'aria-selected' }) override ariaSelected: string | null = null;
}

export interface Tab extends AffixIconWithTrailing { }
applyMixins(Tab, AffixIconWithTrailing);
