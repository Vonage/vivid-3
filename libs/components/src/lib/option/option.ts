import {
	attr,
	FASTElement,
	observable,
	Observable,
} from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { applyMixins } from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

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
 * @public
 * @component option
 * @slot icon - Slot to add an icon to the option.
 */
export class ListboxOption extends FASTElement {
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
		if (this.$fastController.isConnected) {
			if (!this.dirtySelected) {
				this.dirtySelected = true;
			}

			if (this.proxy instanceof HTMLOptionElement) {
				this.proxy.selected = this.selected;
			}
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
	protected initialValue: string;
	initialValueChanged(): void {
		// If the value is clean and the component is connected to the DOM
		// then set value equal to the attribute value.
		if (!this.dirtyValue) {
			this.value = this.initialValue;
			this.dirtyValue = false;
		}
	}

	@attr({
		attribute: 'label',
	})
	_label?: string;

	set label(value: string) {
		this._label = value;
	}

	get label(): string {
		return this._label ?? this.text;
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

	get text(): string {
		return this._text ?? '';
	}

	set value(next: string) {
		this._value = next;

		this.dirtyValue = true;

		if (this.proxy instanceof HTMLElement) {
			this.proxy.value = next;
		}

		Observable.notify(this, 'value');
	}

	get value(): string {
		Observable.track(this, 'value');
		return this._value ? this._value : this.text;
	}

	get form(): HTMLFormElement | null {
		return this.proxy ? this.proxy.form : null;
	}

	constructor(
		text?: string,
		value?: string,
		defaultSelected?: boolean,
		selected?: boolean
	) {
		super();
		// @ts-expect-error Property used before it's defined
		this.initialValue = this.initialValue || '';

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
			this.initialValue,
			this.defaultSelected,
			this.selected
		);
		// @ts-expect-error Property used before it's defined
		this.proxy.disabled = this.disabled;
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
}

export interface ListboxOption extends AffixIconWithTrailing {}
applyMixins(ListboxOption, AffixIconWithTrailing);
