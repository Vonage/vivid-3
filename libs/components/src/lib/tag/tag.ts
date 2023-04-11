import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';

import type {
	Appearance, Connotation, Shape,
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
		if (!this.removable) {
			return;
		}

		this.$emit('removed');
		this.parentElement && this.parentElement.removeChild(this);
	}

	#select = (): void => {
		if (!this.selectable || this.disabled || this.removable) {
			return;
		}
		this.selected = !this.selected;
		this.$emit('selected-change');
	};

	handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			this.#select();
		}
		if (e.key === 'Delete') {
			this.remove();
		}
	}

	handleClick(): void {
		this.#select();
	}
}

export interface Tag extends AffixIcon { }
applyMixins(Tag, AffixIcon);
