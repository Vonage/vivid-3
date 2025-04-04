import { attr } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';
import type { Appearance, Connotation, Shape } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of tag connotation.
 *
 * @public
 */
export type TagConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of tag appearance.
 *
 * @public
 */
export type TagAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Subtle | Appearance.Duotone
>;

/**
 * Types of tag shape.
 *
 * @public
 */
export type TagShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;

/**
 * @public
 * @component tag
 * @slot icon - Add an icon to the component.
 * @event {CustomEvent<undefined>} selected-change - Fires when the selected state changes
 * @event {CustomEvent<undefined>} removed - Fires when the tag is removed
 */
export class Tag extends AffixIcon(VividElement) {
	/**
	 * The connotation the tag should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TagConnotation;

	/**
	 * The shape the tag should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: TagShape;

	/**
	 * The appearance the tag should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: TagAppearance;

	/**
	 * Indicates the tag's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * indicates whether the tag is removable
	 *
	 * @public
	 * HTML Attribute: removable
	 */
	@attr({ mode: 'boolean' }) removable = false;

	/**
	 * indicates whether the tag is disabled
	 *
	 * @public
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

	/**
	 * indicates whether the tag is selectable
	 *
	 * @public
	 * HTML Attribute: selectable
	 */
	@attr({ mode: 'boolean' }) selectable = false;

	/**
	 * indicates whether the tag is selected
	 *
	 * @public
	 * HTML Attribute: selected
	 */
	@attr({ mode: 'boolean' }) selected = false;

	override remove(): void {
		if (!this.removable || this.selectable) {
			return;
		}

		this.$emit('removed');
		this.parentElement && this.parentElement.removeChild(this);
	}

	#select = (): void => {
		if (!this.selectable || this.disabled) {
			return;
		}
		this.selected = !this.selected;
		this.$emit('selected-change');
	};

	handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.#select();
		}
		if (e.key === 'Delete' || e.key === 'Backspace') {
			this.remove();
		}
		return true;
	}

	handleClick(): void {
		this.#select();
	}
}
