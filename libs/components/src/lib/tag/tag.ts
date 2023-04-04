import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';

import type {
	Appearance, Connotation, Shape, Size,
} from '../enums.js';

/**
 * Types of tag connotation.
 *
 * @public
 */
export type TagConnotation = Extract<Connotation, Connotation.Accent | Connotation.CTA>;

/**
 * Types of tag appearance.
 *
 * @public
 */
export type TagAppearance = Extract<Appearance, Appearance.Subtle | Appearance.Duotone>;

/**
 * Types of tag shape.
 *
 * @public
 */
export type TagShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Types of tag size.
 *
 * @public
 */
export type TagSize = Extract<Size, Size.Condensed | Size.Normal | Size.Expanded>;

/**
 * Base class for tag.
 *
 * @public
 */
export class Tag extends FoundationElement {
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
	 * The size the tag should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: TagSize;

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

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('keydown', this.#closeOnKeyDown);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this.#closeOnKeyDown);
	}

	handleClick(): void {
		this.changeSelection();
	}

	changeSelection(): void {
		if (!this.selectable || this.disabled || this.removable) {
			return;
		}
		this.selected = !this.selected;

		this.$emit('selected-change');
	}

	override remove(): void {
		this.$emit('removed');
		this.parentElement && this.parentElement.removeChild(this);
	}

	#closeOnKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Escape' || !this.removable) {
			return;
		}
		this.remove();
	};
}

export interface Tag extends AffixIcon { }
applyMixins(Tag, AffixIcon);
