import { attr, observable } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { Localized } from '../../shared/patterns';
import type { Connotation, Shape } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * Types of tab connotation.
 *
 * @public
 */
export type TabConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of avatar shape.
 *
 * @public
 */
export type TabShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Sharp>;

/**
 * @public
 * @component tab
 * @slot icon - The preferred way to add an icon to the component.
 * @testSelector byLabel byLabel
 * @testAction select click #base
 * @testQuery active active true
 * @testQuery inactive active false
 * @testRef base shadow .base
 */
export class Tab extends HostSemantics(
	AffixIconWithTrailing(Localized(VividElement))
) {
	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' })
	disabled!: boolean;

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
	 * Adds a close button
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: removable
	 */
	@attr({ mode: 'boolean' }) removable = false;

	@attr({ mode: 'fromView' }) override tabIndex: number =
		'-1' as unknown as number;

	/**
	 * @internal
	 */
	@observable active = false;

	_handleCloseClick(e: Event) {
		e.stopImmediatePropagation();
		this.$emit('close');
	}

	_onKeyDown(e: KeyboardEvent) {
		if (!this.removable || e.key !== 'Delete') return true;

		e.stopImmediatePropagation();
		this.$emit('close');
		return false;
	}
}
