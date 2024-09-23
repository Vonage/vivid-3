import { Select as FoundationSelect } from '@microsoft/fast-foundation';
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
import type { Appearance, Shape, Size } from '../enums';
import type { ListboxOption } from '../option/option';
import { Listbox } from '../listbox/listbox';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';

export type SelectAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;
export type SelectSize = Extract<Size, Size.Condensed | Size.Normal>;

/**
 * @public
 * @component select
 * @slot - Default slot.
 * @slot icon - Slot to add an icon to the select control.
 * @slot meta - Slot to add meta content to the select control.
 * @slot helper-text - Describes how to use the select. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Fires a custom 'input' event when the value updates
 * @event {CustomEvent<HTMLElement>} change - Fires a custom 'change' event when the value updates
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class Select extends FoundationSelect {
	/**
	 * @internal
	 */
	@observable _anchor!: HTMLElement;

	/**
	 * The size the select should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr() scale?: SelectSize;

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
	 * @internal
	 */
	@observable _feedbackWrapper: HTMLElement | null = null;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: Node[];

	labelChanged() {
		if (!this.ariaLabel) {
			this.ariaLabel = this.label;
		}
	}

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

	/*
	 * @internal
	 */
	override slottedOptionsChanged(prev: Element[] | undefined, next: Element[]) {
		super.slottedOptionsChanged(prev, next);

		// Workaround for bug in FAST:
		// Proxy value is set before options are added to proxy, which causes the value to be discarded
		// Therefore, we need to set the value again and update validation
		this.proxy.value = this.value;
		this.validate();
	}

	override formResetCallback() {
		super.formResetCallback();
		if (this.placeholder) {
			this.selectedIndex = -1;
		}
	}
}

export interface Select
	extends AffixIconWithTrailing,
		FormElement,
		FormElementHelperText,
		ErrorText,
		FormElementSuccessText {}
applyMixinsWithObservables(
	Select,
	AffixIconWithTrailing,
	FormElementHelperText,
	FormElementSuccessText
);
