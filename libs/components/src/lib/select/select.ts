import {
	applyMixins,
	Select as FoundationSelect,
} from '@microsoft/fast-foundation';
import { attr, observable, Observable } from '@microsoft/fast-element';
import {
	AffixIconWithTrailing,
	errorText,
	type ErrorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import type { Appearance, Shape } from '../enums';
import type { ListboxOption } from '../option/option';
import { Listbox } from '../listbox/listbox';

export type SelectAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for select
 *
 * @public
 * @slot - Default slot.
 * @slot icon - Slot to add an icon to the select control.
 * @slot meta - Slot to add meta content to the select control.
 */
@errorText
@formElements
export class Select extends FoundationSelect {
	/**
	 * @internal
	 */
	@observable _anchor!: HTMLElement;

	/**
	 * The appearance attribute.
	 *
	 * @public
	 * HTML Attribute: appearance
	 */
	@attr appearance?: SelectAppearance;

	/**
	 * The shape attribute.
	 *
	 * @public
	 * HTML Attribute: shape
	 */
	@attr shape?: SelectShape;

	/**
	 * The fixed-dropdown attribute.
	 *
	 * @public
	 * HTML Attribute: fixed-dropdown
	 */
	@attr({ mode: 'boolean', attribute: 'fixed-dropdown' }) fixedDropdown = false;

	/**
	 * The placeholder attribute.
	 *
	 * @public
	 * HTML Attribute: placeholder
	 */
	@attr placeholder: string | undefined;

	/**
	 * The ref to the internal placeholder option.
	 *
	 * @internal
	 */
	@observable placeholderOption: ListboxOption | null = null;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: Node[];

	override connectedCallback() {
		super.connectedCallback();
	}

	override get displayValue(): string {
		Observable.track(this, 'displayValue');

		return (
			this.firstSelectedOption?.getAttribute('label') ??
			this.firstSelectedOption?.text ??
			this.placeholder ??
			''
		);
	}

	override setDefaultSelectedOption(): void {
		const options = Array.from(this.children).filter(
			Listbox.slottedOptionFilter as any
		);

		const selectedIndex = options.findIndex(
			(el) =>
				el.hasAttribute('selected') ||
				(el as ListboxOption).selected ||
				(el as ListboxOption).value === this.value
		);

		if (selectedIndex === -1 && !this.placeholderOption) {
			this.selectedIndex = 0;
			return;
		}

		if (selectedIndex !== -1 || this.placeholder !== '') {
			this.selectedIndex = selectedIndex;
			return;
		}
	}
}

export interface Select
	extends AffixIconWithTrailing,
		FormElement,
		FormElementHelperText,
		ErrorText,
		FormElementSuccessText {}
applyMixins(
	Select,
	AffixIconWithTrailing,
	FormElementHelperText,
	FormElementSuccessText
);
