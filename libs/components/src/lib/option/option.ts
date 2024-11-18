import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { attr, observable, Observable } from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { ARIAGlobalStatesAndProperties } from '../../shared/foundation/patterns/aria-global';

/**
 * Listbox option configuration options
 * @public
 */
export type ListboxOptionOptions = FoundationElementDefinition;

/**
 * Determines if the element is a {@link (ListboxOption:class)}
 *
 * @param element - the element to test.
 * @public
 */
export function isListboxOption(el: Element): el is ListboxOption {
	return (
		isHTMLElement(el) &&
		((el.getAttribute('role') as string) === 'option' ||
			el instanceof HTMLOptionElement)
	);
}

/**
 * An Option Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#option | ARIA option }.
 *
 * @slot start - Content which can be provided before the listbox option content
 * @slot end - Content which can be provided after the listbox option content
 * @slot - The default slot for listbox option content
 * @csspart content - Wraps the listbox option content
 *
 * @public
 */
export class ListboxOption extends FoundationElement {
	/**
	 * @internal
	 */
	// @ts-expect-error Type is incorrectly non-optional
	private _value: string;

	/**
	 * @internal
	 */
	proxy: HTMLOptionElement;

	/**
	 * The checked state is used when the parent listbox is in multiple selection mode.
	 * To avoid accessibility conflicts, the checked state should not be present in
	 * single selection mode.
	 *
	 * @public
	 */
	@observable
	checked?: boolean;

	/**
	 * Updates the ariaChecked property when the checked property changes.
	 *
	 * @param _ - the previous checked value
	 * @param next - the current checked value
	 *
	 * @public
	 */
	protected checkedChanged(_: boolean | unknown, next?: boolean): void {
		if (typeof next === 'boolean') {
			this.ariaChecked = next ? 'true' : 'false';
			return;
		}

		this.ariaChecked = null;
	}

	/**
	 * The default slotted content.
	 *
	 * @public
	 */
	// @ts-expect-error Type is incorrectly non-optional
	content: Node[];

	/**
	 * Updates the proxy's text content when the default slot changes.
	 *
	 * @internal
	 */
	protected contentChanged(): void {
		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.textContent = this.textContent;
		}

		this.$emit('contentchange', null, { bubbles: true });
	}

	/**
	 * The defaultSelected state of the option.
	 * @public
	 */
	@observable
	defaultSelected = false;
	protected defaultSelectedChanged(): void {
		if (!this.dirtySelected) {
			this.selected = this.defaultSelected;

			if (this.proxy instanceof HTMLOptionElement) {
				this.proxy.selected = this.defaultSelected;
			}
		}
	}

	/**
	 * Tracks whether the "selected" property has been changed.
	 * @internal
	 */
	private dirtySelected = false;

	/**
	 * The disabled state of the option.
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	disabled: boolean;
	protected disabledChanged(): void {
		this.ariaDisabled = this.disabled ? 'true' : 'false';

		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.disabled = this.disabled;
		}
	}

	/**
	 * The selected attribute value. This sets the initial selected value.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: selected
	 */
	@attr({ attribute: 'selected', mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	selectedAttribute: boolean;
	protected selectedAttributeChanged(): void {
		this.defaultSelected = this.selectedAttribute;

		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.defaultSelected = this.defaultSelected;
		}
	}

	/**
	 * The checked state of the control.
	 *
	 * @public
	 */
	@observable
	selected: boolean = this.defaultSelected;
	protected selectedChanged(): void {
		this.ariaSelected = this.selected ? 'true' : 'false';

		if (!this.dirtySelected) {
			this.dirtySelected = true;
		}

		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.selected = this.selected;
		}
	}

	/**
	 * Track whether the value has been changed from the initial value
	 */
	dirtyValue = false;

	/**
	 * The initial value of the option. This value sets the `value` property
	 * only when the `value` property has not been explicitly set.
	 *
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ attribute: 'value', mode: 'fromView' })
	// @ts-expect-error Type is incorrectly non-optional
	protected initialValue: string;
	initialValueChanged(): void {
		// If the value is clean and the component is connected to the DOM
		// then set value equal to the attribute value.
		if (!this.dirtyValue) {
			this.value = this.initialValue;
			this.dirtyValue = false;
		}
	}

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: text
	 */
	@attr({
		attribute: 'label',
	})
	_label?: string;

	get label(): string {
		return this._label ?? this.text;
	}

	set label(value: string) {
		this._label = value;
	}

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: text
	 */
	@attr({
		attribute: 'text',
	})
	_text?: string;

	set text(value) {
		this._text = value;
	}

	get text() {
		return this._text ?? '';
	}

	set value(next: string) {
		const newValue = `${next ?? ''}`;
		this._value = newValue;

		this.dirtyValue = true;

		if (this.proxy instanceof HTMLOptionElement) {
			this.proxy.value = newValue;
		}

		Observable.notify(this, 'value');
	}

	get value(): string {
		Observable.track(this, 'value');
		return this._value ?? this.text;
	}

	get form(): HTMLFormElement | null {
		return this.proxy ? this.proxy.form : null;
	}

	/**
	 * Whether to appear highlighted to indicate visual focus for keyboard interactions.
	 * @internal
	 */
	@observable _highlighted = false;

	/**
	 * Whether selected options should be decorated with a checkmark.
	 * @internal
	 */
	@observable _displayCheckmark = false;

	/**
	 * Range of text that should be highlighted as matching a search query.
	 * From is inclusive, to is exclusive.
	 * @internal
	 */
	@observable _matchedRange: { from: number; to: number } | null = null;

	/**
	 * @internal
	 */
	get _matchedRangeSafe() {
		return this._matchedRange ?? { from: 0, to: 0 };
	}

	constructor(
		text?: string,
		value?: string,
		defaultSelected?: boolean,
		selected?: boolean
	) {
		super();

		if (text) {
			this.textContent = text;
		}

		if (value) {
			this.initialValue = value;
		}

		if (defaultSelected) {
			this.defaultSelected = defaultSelected;
		}

		if (selected) {
			this.selected = selected;
		}

		this.proxy = new Option(
			`${this.textContent}`,
			// @ts-expect-error Propery is used before it is assigned
			this.initialValue,
			this.defaultSelected,
			this.selected
		);
		// @ts-expect-error Propery is used before it is assigned
		this.proxy.disabled = this.disabled;
	}
}

/**
 * States and properties relating to the ARIA `option` role.
 *
 * @public
 */
export class DelegatesARIAListboxOption {
	/**
	 * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: `aria-checked`
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	ariaChecked: 'true' | 'false' | string | null;

	/**
	 * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: `aria-posinset`
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	ariaPosInSet: string | null;

	/**
	 * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: `aria-selected`
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	ariaSelected: 'true' | 'false' | string | null;

	/**
	 * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: `aria-setsize`
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	ariaSetSize: string | null;
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
export interface DelegatesARIAListboxOption
	extends ARIAGlobalStatesAndProperties {}
applyMixins(DelegatesARIAListboxOption, ARIAGlobalStatesAndProperties);

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
export interface ListboxOption
	extends DelegatesARIAListboxOption,
		AffixIconWithTrailing {}
applyMixins(ListboxOption, AffixIconWithTrailing, DelegatesARIAListboxOption);
