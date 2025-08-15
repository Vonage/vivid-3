import { attr, DOM, Observable, observable } from '@microsoft/fast-element';
import { limit, uniqueId } from '@microsoft/fast-web-utilities';
import type { Popup } from '../popup/popup';
import type { Appearance, Shape, Size } from '../enums';
import {
	AffixIcon,
	FormElement,
	WithErrorText,
	WithSuccessText,
} from '../../shared/patterns';
import type { ListboxOption } from '../option/option';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { WithFeedback } from '../../shared/feedback/mixins';
import { Listbox } from '../../shared/foundation/listbox/listbox';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { ComboboxAutocomplete } from './combobox.options';

/**
 * Types of popup placement
 *
 * @public
 */
export type PopupPlacement = 'top' | 'bottom';

/**
 * Types of input appearance
 *
 * @public
 */
export type ComboboxAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type ComboboxShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;
export type ComboboxSize = ExtractFromEnum<Size, Size.Condensed | Size.Normal>;

/**
 * @public
 * @component combobox
 * @slot - Default slot.
 * @slot icon - The preferred way to add an icon to the combobox control.
 * @slot meta - Slot to add meta content to the combobox control.
 * @slot helper-text - Describes how to use the combobox. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value updates
 * @vueModel modelValue value change `event.currentTarget.value`
 * @testAction fill comboboxFill
 * @testAction clear comboboxClear
 * @testAction selectOptionByText selectOptionByText
 * @testAction selectOptionByValue selectOptionByValue
 * @testRef control shadow input.control
 */
export class Combobox extends WithFeedback(
	WithErrorText(
		WithSuccessText(FormElement(AffixIcon(FormAssociated(Listbox))))
	)
) {
	/**
	 * The autocomplete attribute.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: autocomplete
	 */
	@attr({ attribute: 'autocomplete', mode: 'fromView' })
	autocomplete: ComboboxAutocomplete | undefined;

	/**
	 * Reference to the internal text input element.
	 *
	 * @internal
	 */
	// @ts-expect-error Type is incorrectly non-optional
	control: HTMLInputElement;

	/**
	 * Reference to the internal listbox element.
	 *
	 * @internal
	 */
	// @ts-expect-error Type is incorrectly non-optional
	listbox: HTMLDivElement;

	/**
	 * The collection of currently filtered options.
	 *
	 * @public
	 */
	filteredOptions: ListboxOption[] = [];

	/**
	 * The current filter value.
	 *
	 * @internal
	 */
	private filter = '';

	/**
	 * The appearance attribute.
	 *
	 * @public
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ComboboxAppearance;

	/**
	 * The shape attribute.
	 *
	 * @public
	 * HTML Attribute: shape
	 */
	@attr shape?: ComboboxShape;

	/**
	 * The size the combobox should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr() scale?: ComboboxSize;

	/**
	 * the placement of the combobox
	 *
	 * HTML Attribute: string
	 */
	@attr placement?: PopupPlacement;

	/**
	 * Whether the dropdown is using a fixed positioning strategy.
	 *
	 * @public
	 * HTML Attribute: fixed-dropdown
	 */
	@attr({ mode: 'boolean', attribute: 'fixed-dropdown' }) fixedDropdown = false;

	_popup!: Popup;
	_anchor!: HTMLElement;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: Node[];

	/**
	 * Reset the element to its first selectable option when its parent form is reset.
	 *
	 * @internal
	 */
	override formResetCallback(): void {
		super.formResetCallback();
		this.setDefaultSelectedOption();
		this.updateValue();
	}

	/** {@inheritDoc (FormAssociated:interface).validate} */
	override validate(): void {
		super.validate(this.control);
	}

	private get isAutocompleteInline(): boolean {
		return (
			this.autocomplete === ComboboxAutocomplete.inline ||
			this.isAutocompleteBoth
		);
	}

	private get isAutocompleteList(): boolean {
		return (
			this.autocomplete === ComboboxAutocomplete.list || this.isAutocompleteBoth
		);
	}

	private get isAutocompleteBoth(): boolean {
		return this.autocomplete === ComboboxAutocomplete.both;
	}

	/**
	 * The unique id for the internal listbox element.
	 *
	 * @internal
	 */
	listboxId: string = uniqueId('listbox-');

	/**
	 * The max height for the listbox when opened.
	 *
	 * @internal
	 */
	@observable
	maxHeight = 0;

	/**
	 * The open attribute.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({ attribute: 'open', mode: 'boolean' })
	open = false;

	/**
	 * Sets focus when the open property changes.
	 *
	 * @param prev - the previous open value
	 * @param next - the current open value
	 *
	 * @internal
	 */
	protected openChanged() {
		if (this.open) {
			this.focusAndScrollOptionIntoView();

			// focus is directed to the element when `open` is changed programmatically
			DOM.processUpdates();
			this.control.focus();

			return;
		}
	}

	/**
	 * The list of options.
	 *
	 * @public
	 * @remarks
	 * Overrides `Listbox.options`.
	 */
	override get options(): ListboxOption[] {
		Observable.track(this, 'options');
		return this.filteredOptions.length ? this.filteredOptions : this._options;
	}

	override set options(value: ListboxOption[]) {
		this._options = value;
		Observable.notify(this, 'options');
	}

	/**
	 * Sets the placeholder value of the element, generally used to provide a hint to the user.
	 * @public
	 * @remarks
	 * HTML Attribute: placeholder
	 * Using this attribute is not a valid substitute for a labeling element.
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	placeholder: string;

	/**
	 * Updates the placeholder on the proxy element.
	 * @internal
	 */
	protected placeholderChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.placeholder = this.placeholder;
		}
	}

	/**
	 * @internal
	 */
	override valueChanged(prev: string, next: string) {
		if (this.$fastController.isConnected && this.options) {
			const selectedIndex = this.options.findIndex(
				(el) => el.text.toLowerCase() === next.toLowerCase()
			);

			const prevSelectedValue = this.options[this.selectedIndex]?.text;
			const nextSelectedValue = this.options[selectedIndex]?.text;

			this.selectedIndex =
				prevSelectedValue !== nextSelectedValue
					? selectedIndex
					: this.selectedIndex;
		}

		super.valueChanged(prev, next);
	}

	/**
	 * Handle opening and closing the listbox when the combobox is clicked.
	 *
	 * @param e - the mouse event
	 * @internal
	 */
	override clickHandler(e: MouseEvent): boolean | void {
		if (this.disabled) {
			return;
		}

		if (this.open) {
			const capturedOption = (e.target as HTMLElement).closest(
				`option,[role=option],[data-vvd-component=option]`
			) as ListboxOption | null;

			if (!capturedOption || capturedOption.disabled) {
				return;
			}

			this.selectedOptions = [capturedOption];
			this.control.value = capturedOption.text;
			this.clearSelectionRange();
			this.updateValue(true);
		}

		this.open = !this.open;

		if (this.open) {
			this.control.focus();
		}

		return true;
	}

	/**
	 * Handle closing the listbox when the combobox is open and the chevron icon is clicked.
	 *
	 * @param e - the mouse event
	 * @internal
	 */
	_chevronIconClickHandler(e: MouseEvent): void {
		if (!this.open) return;
		e.stopPropagation();
		this.open = false;
	}

	override connectedCallback() {
		super.connectedCallback();
		if (this.value) {
			this.initialValue = this.value;
		}
		this._popup.anchor = this._anchor;
	}

	/**
	 * Filter available options by text value.
	 *
	 * @public
	 */
	filterOptions(): void {
		if (!this.autocomplete || this.autocomplete === ComboboxAutocomplete.none) {
			this.filter = '';
		}

		this.filteredOptions = this._options.filter((o) =>
			o.text.toLowerCase().startsWith(this.filter.toLowerCase())
		);

		if (this.isAutocompleteList) {
			this._options.forEach((o) => {
				o.hidden = !this.filteredOptions.includes(o);
			});
		}
	}

	/**
	 * Focus the control and scroll the first selected option into view.
	 *
	 * @internal
	 * @remarks
	 * Overrides: `Listbox.focusAndScrollOptionIntoView`
	 */
	protected override focusAndScrollOptionIntoView(): void {
		if (this.contains(document.activeElement)) {
			this.control.focus();
			const firstSelectedOption = this.firstSelectedOption;
			if (firstSelectedOption) {
				requestAnimationFrame(() => {
					firstSelectedOption.scrollIntoView({ block: 'nearest' });
				});
			}
		}
	}

	/**
	 * Handle focus state when the element or its children lose focus.
	 *
	 * @param e - The focus event
	 * @internal
	 */
	focusoutHandler(e: FocusEvent): boolean | void {
		this.syncValue();

		if (!this.open) {
			return true;
		}

		const focusTarget = e.relatedTarget as HTMLElement;
		if (this.isSameNode(focusTarget)) {
			this.focus();
			return;
		}

		this.open = false;
	}

	/**
	 * Handle content changes on the control input.
	 *
	 * @param e - the input event
	 * @internal
	 */
	inputHandler(e: InputEvent): boolean | void {
		this.filter = this.control.value;
		this.filterOptions();

		if (!this.isAutocompleteInline) {
			this.selectedIndex = this.options
				.map((option) => option.text)
				.indexOf(this.control.value);
		}

		if (e.inputType.includes('deleteContent') || !this.filter.length) {
			return true;
		}

		if (this.isAutocompleteList && !this.open) {
			this.open = true;
		}

		if (this.isAutocompleteInline) {
			if (this.filteredOptions.length) {
				this.selectedOptions = [this.filteredOptions[0]];
				this.selectedIndex = this.options.indexOf(this.firstSelectedOption);
				this.setInlineSelection();
			} else {
				this.selectedIndex = -1;
			}
		}
		return;
	}

	/**
	 * Handle keydown actions for listbox navigation.
	 *
	 * @param e - the keyboard event
	 * @internal
	 */
	override keydownHandler(e: Event & KeyboardEvent): boolean | void {
		const key = e.key;

		if (e.ctrlKey || e.shiftKey) {
			return true;
		}

		switch (key) {
			case 'Enter': {
				this.syncValue();
				if (this.isAutocompleteInline) {
					this.filter = this.value;
				}

				this.open = false;
				this.clearSelectionRange();
				break;
			}

			case 'Escape': {
				if (!this.isAutocompleteInline) {
					this.selectedIndex = -1;
				}

				if (this.open) {
					this.open = false;
					break;
				}

				this.value = '';
				this.control.value = '';
				this.filter = '';
				this.filterOptions();
				break;
			}

			case 'Tab': {
				this.setInputToSelection();

				if (!this.open) {
					return true;
				}

				e.preventDefault();
				this.open = false;
				break;
			}

			case 'ArrowUp':
			case 'ArrowDown': {
				this.filterOptions();

				if (!this.open) {
					this.open = true;
					break;
				}

				if (this.filteredOptions.length > 0) {
					super.keydownHandler(e);
				}

				if (this.isAutocompleteInline) {
					this.setInlineSelection();
				}

				break;
			}

			default: {
				return true;
			}
		}
	}

	/**
	 * Ensure that the selectedIndex is within the current allowable filtered range.
	 *
	 * @param prev - the previous selected index value
	 * @param next - the current selected index value
	 *
	 * @internal
	 */
	override selectedIndexChanged(prev: number | undefined, next: number): void {
		if (this.$fastController.isConnected) {
			next = limit(-1, this.options.length - 1, next);

			// we only want to call the super method when the selectedIndex is in range
			if (next !== this.selectedIndex) {
				this.selectedIndex = next;
				return;
			}

			super.selectedIndexChanged(prev, next);
		}
	}

	/**
	 * Move focus to the previous selectable option.
	 *
	 * @internal
	 * @remarks
	 * Overrides `Listbox.selectPreviousOption`
	 */
	override selectPreviousOption(): void {
		if (!this.disabled && this.selectedIndex >= 0) {
			this.selectedIndex = this.selectedIndex - 1;
		}
	}

	/**
	 * Set the default selected options at initialization or reset.
	 *
	 * @internal
	 * @remarks
	 * Overrides `Listbox.setDefaultSelectedOption`
	 */
	override setDefaultSelectedOption(): void {
		if (this.$fastController.isConnected && this.options) {
			const selectedIndex = this.options.findIndex(
				(el) => el.getAttribute('selected') !== null || el.selected
			);

			this.selectedIndex = selectedIndex;
			if (!this.dirtyValue && this.firstSelectedOption) {
				this.value = this.firstSelectedOption.text;
			}
			this.setSelectedOptions();
		}
	}

	/**
	 * Focus and set the content of the control based on the first selected option.
	 *
	 * @internal
	 */
	private setInputToSelection(): void {
		if (this.firstSelectedOption) {
			this.control.value = this.firstSelectedOption.text;
			this.control.focus();
		}
	}

	/**
	 * Focus, set and select the content of the control based on the first selected option.
	 *
	 * @internal
	 */
	private setInlineSelection(): void {
		if (this.firstSelectedOption) {
			this.setInputToSelection();
			this.control.setSelectionRange(
				this.filter.length,
				this.control.value.length,
				'backward'
			);
		}
	}

	/**
	 * Determines if a value update should involve emitting a change event, then updates the value.
	 *
	 * @internal
	 */
	private syncValue(): void {
		const newValue = this.firstSelectedOption?.text ?? this.control.value;
		this.updateValue(this.value !== newValue);
	}

	/**
	 * Ensure that the entire list of options is used when setting the selected property.
	 *
	 * @param prev - the previous list of selected options
	 * @param next - the current list of selected options
	 *
	 * @internal
	 * @remarks
	 * Overrides: `Listbox.selectedOptionsChanged`
	 */
	override selectedOptionsChanged(
		_prev: ListboxOption[] | undefined,
		next: ListboxOption[]
	): void {
		if (this.$fastController.isConnected) {
			this._options.forEach((o) => {
				o.selected = next.includes(o);
			});
		}
	}

	/**
	 * @internal
	 */
	override proxy = document.createElement('input');

	/**
	 * Synchronize the form-associated proxy and update the value property of the element.
	 *
	 * @param prev - the previous collection of slotted option elements
	 * @param next - the next collection of slotted option elements
	 *
	 * @internal
	 */
	override slottedOptionsChanged(
		prev: Element[] | undefined,
		next: Element[]
	): void {
		super.slottedOptionsChanged(prev, next);
		this.updateValue();

		const scale = this.getAttribute('scale') || this.scale;
		next.forEach((element) => {
			if (scale) {
				element.setAttribute('scale', scale);
				(element as any).scale = scale;
			}
		});
	}

	/**
	 * Sets the value and to match the first selected option.
	 *
	 * @param shouldEmit - if true, the change event will be emitted
	 *
	 * @internal
	 */
	private updateValue(shouldEmit?: boolean) {
		if (this.$fastController.isConnected) {
			this.value = this.firstSelectedOption?.text || this.control.value;
			this.control.value = this.value;
		}

		if (shouldEmit) {
			this.$emit('change');
		}
	}

	/**
	 * @internal
	 */
	private clearSelectionRange() {
		const controlValueLength = this.control.value.length;
		this.control.setSelectionRange(controlValueLength, controlValueLength);
	}
}
