import { attr } from '@microsoft/fast-element';
import { applyMixins, Tab as FoundationTab } from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

import type { Connotation, Shape } from '../enums.js';

/**
 * Types of tab connotation.
 *
 * @public
 */
export type TabConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of avatar shape.
 *
 * @public
 */
export type TabShape = Extract<Shape, Shape.Rounded | Shape.Sharp>;

/**
 * @public
 * @component tab
 * @slot icon - Slot to add an icon to tab.
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

	/**
	 * Indicates the tab's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr({ mode: 'boolean' }) removable = false;

	@attr({ mode: 'fromView' }) override tabIndex: number =
		'-1' as unknown as number;

	@attr({ attribute: 'aria-selected' }) override ariaSelected: string | null =
		null;

	_handleCloseClick(e: Event) {
		e.stopImmediatePropagation();
		this.$emit('close');
	}

	_onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Delete') {
			e.stopImmediatePropagation();
			this.$emit('close');
			return false;
		}
		return true;
	}
}

export interface Tab extends AffixIconWithTrailing {}
applyMixins(Tab, AffixIconWithTrailing);
