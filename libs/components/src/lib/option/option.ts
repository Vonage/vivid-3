import {
	attr,
	observable,
	Observable,
	volatile,
} from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';
import type { OptionTagConnotation } from '../searchable-select/option-tag';

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
 * @public
 * @component option
 * @slot icon - The preferred way to add an icon to the component.
 */
export class ListboxOption extends HostSemantics(
	AffixIconWithTrailing(VividElement)
) {
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
		return null;
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
	 * Text to highlighted as matching a search query.
	 * @remarks
	 * HTML Attribute: matched-text
	 */
	@attr({ attribute: 'matched-text' }) matchedText?: string;

	/**
	 * Search text set by a parent component.
	 * @internal
	 */
	@observable _vvdSearchText = '';

	@volatile
	get _hasMatchedText() {
		return Boolean(this.matchedText ?? this._vvdSearchText);
	}

	/**
	 * Whether the option is considered matching by a parent component.
	 * @internal
	 */
	@observable _isNotMatching = false;

	/**
	 * From is inclusive, to is exclusive.
	 * @internal
	 */
	@volatile
	get _matchedRange() {
		const matchedText = this.matchedText ?? this._vvdSearchText;
		if (matchedText) {
			const matchIndex = this.text
				.toLowerCase()
				.indexOf(matchedText.toLowerCase());
			return matchIndex === -1
				? { from: 0, to: 0 }
				: {
						from: matchIndex,
						to: matchIndex + matchedText.length,
				  };
		}
		return { from: 0, to: 0 };
	}

	/**
	 * When displayed as a tag, the connotation of the tag.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: tag-connotation
	 */
	@attr({ attribute: 'tag-connotation' }) tagConnotation?: OptionTagConnotation;

	constructor(
		text?: string,
		value?: string,
		defaultSelected?: boolean,
		selected?: boolean
	) {
		super();

		if (text) {
			this.text = text;
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
			this.text,
			// @ts-expect-error Propery is used before it is assigned
			this.initialValue,
			this.defaultSelected,
			this.selected
		);
		// @ts-expect-error Propery is used before it is assigned
		this.proxy.disabled = this.disabled;
	}
}
