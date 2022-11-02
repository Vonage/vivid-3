import { attr } from '@microsoft/fast-element';
import { ListboxElement as FoundationListboxElement } from '@microsoft/fast-foundation';
import type { Appearance } from '../enums';

/**
 * Types of listbox appearance.
 *
 * @public
 */
export type LisboxAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;

/**
 * Base class for listbox
 *
 * @public
 */
export class Listbox extends FoundationListboxElement {
	/**
	 * The appearance the listbox should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: LisboxAppearance;

	override slottedOptionsChanged(prev: Element[] | undefined, next: Element[]) {
		super.slottedOptionsChanged(prev, next);
		this.#disableSlottedChildren();
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'disabled') {
			this.#disableSlottedChildren();
		}
	}

	#disableSlottedChildren(): void {
		this.options.forEach(optionElement => {
			if (!optionElement.disabled) {
				optionElement.disabled = this.disabled;
			}
		});
	}
}
