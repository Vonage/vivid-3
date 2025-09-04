import {
	attr,
	DOM,
	observable,
	Observable,
	volatile,
} from '@microsoft/fast-element';
import {
	inRange,
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyEnter,
	keyEscape,
	keyHome,
	keySpace,
	keyTab,
	uniqueId,
} from '@microsoft/fast-web-utilities';
import {
	AffixIconWithTrailing,
	FormElement,
	WithErrorText,
	WithSuccessText,
} from '../../shared/patterns';
import type { Appearance, Shape, Size } from '../enums';
import type { ListboxOption } from '../option/option';
import { Listbox } from '../../shared/foundation/listbox/listbox';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { HostSemantics } from '../../shared/aria/host-semantics';
import { WithLightDOMFeedback } from '../../shared/feedback/mixins';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

export type SelectAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type SelectShape = ExtractFromEnum<Shape, Shape.Rounded | Shape.Pill>;
export type SelectSize = ExtractFromEnum<Size, Size.Condensed | Size.Normal>;

/**
 * @public
 * @component select
 * @slot - Default slot.
 * @slot icon - The preferred way to add an icon to the select control.
 * @slot meta - Slot to add meta content to the select control.
 * @slot helper-text - Describes how to use the select. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Fires a custom 'input' event when the value updates
 * @event {CustomEvent<HTMLElement>} change - Fires a custom 'change' event when the value updates
 * @vueModel modelValue value input `event.currentTarget.value`
 * @testAction selectOptionByValue selectOptionByValue
 * @testAction selectOptionByText selectOptionByText
 */
export class Select extends WithLightDOMFeedback(
	WithErrorText(
		WithSuccessText(
			FormElement(HostSemantics(AffixIconWithTrailing(FormAssociated(Listbox))))
		)
	)
) {
	/**
	 * @internal
	 */
	override proxy = document.createElement('select');

	/**
	 * The index of the most recently checked option.
	 *
	 * @internal
	 * @remarks
	 * Multiple-selection mode only.
	 */
	@observable
	protected activeIndex = -1;

	/**
	 * Returns the last checked option.
	 *
	 * @internal
	 */
	get activeOption(): ListboxOption | null {
		return this.options[this.activeIndex];
	}

	/**
	 * Returns the list of checked options.
	 *
	 * @internal
	 */
	protected get checkedOptions(): ListboxOption[] {
		return this.options.filter((o) => o.checked);
	}

	/**
	 * Returns the index of the first selected option.
	 *
	 * @internal
	 */
	get firstSelectedOptionIndex(): number {
		return this.options.indexOf(this.firstSelectedOption);
	}

	/**
	 * Indicates if the listbox is in multi-selection mode.
	 *
	 * @remarks
	 * HTML Attribute: `multiple`
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	multiple: boolean;

	/**
	 * The start index when checking a range of options.
	 *
	 * @internal
	 */
	protected rangeStartIndex = -1;

	/**
	 * Updates the `ariaActiveDescendant` property when the active index changes.
	 *
	 * @internal
	 */
	protected activeIndexChanged(_: number | undefined, next: number): void {
		this._activeDescendant = this.options[next]?.id ?? '';
		this.focusAndScrollOptionIntoView();
	}

	/**
	 * Toggles the checked state for the currently active option.
	 *
	 * @remarks
	 * Multiple-selection mode only.
	 *
	 * @internal
	 */
	protected checkActiveIndex() {
		const activeItem = this.activeOption;
		if (activeItem) {
			activeItem.checked = true;
		}
	}

	/**
	 * Sets the active index to the first option and marks it as checked.
	 *
	 * @remarks
	 * Multi-selection mode only.
	 *
	 * @param preserveChecked - mark all options unchecked before changing the active index
	 *
	 * @internal
	 */
	protected checkFirstOption(preserveChecked: boolean) {
		if (preserveChecked) {
			if (this.rangeStartIndex === -1) {
				this.rangeStartIndex = this.activeIndex + 1;
			}

			this.options.forEach((o, i) => {
				o.checked = inRange(i, this.rangeStartIndex);
			});
		} else {
			this.uncheckAllOptions();
		}

		this.activeIndex = 0;
		this.checkActiveIndex();
	}

	/**
	 * Decrements the active index and sets the matching option as checked.
	 *
	 * @remarks
	 * Multi-selection mode only.
	 *
	 * @param preserveChecked - mark all options unchecked before changing the active index
	 *
	 * @internal
	 */
	protected checkLastOption(preserveChecked: boolean) {
		if (preserveChecked) {
			if (this.rangeStartIndex === -1) {
				this.rangeStartIndex = this.activeIndex;
			}

			this.options.forEach((o, i) => {
				o.checked = inRange(i, this.rangeStartIndex, this.length);
			});
		} else {
			this.uncheckAllOptions();
		}

		this.activeIndex = this.length - 1;
		this.checkActiveIndex();
	}

	/**
	 * Increments the active index and marks the matching option as checked.
	 *
	 * @remarks
	 * Multiple-selection mode only.
	 *
	 * @param preserveChecked - mark all options unchecked before changing the active index
	 *
	 * @internal
	 */
	protected checkNextOption(preserveChecked: boolean) {
		if (preserveChecked) {
			if (this.rangeStartIndex === -1) {
				this.rangeStartIndex = this.activeIndex;
			}

			this.options.forEach((o, i) => {
				o.checked = inRange(i, this.rangeStartIndex, this.activeIndex + 1);
			});
		} else {
			this.uncheckAllOptions();
		}

		this.activeIndex += this.activeIndex < this.length - 1 ? 1 : 0;
		this.checkActiveIndex();
	}

	/**
	 * Decrements the active index and marks the matching option as checked.
	 *
	 * @remarks
	 * Multiple-selection mode only.
	 *
	 * @param preserveChecked - mark all options unchecked before changing the active index
	 *
	 * @internal
	 */
	protected checkPreviousOption(preserveChecked: boolean) {
		if (preserveChecked) {
			if (this.rangeStartIndex === -1) {
				this.rangeStartIndex = this.activeIndex;
			}

			if (this.checkedOptions.length === 1) {
				this.rangeStartIndex += 1;
			}

			this.options.forEach((o, i) => {
				o.checked = inRange(i, this.activeIndex, this.rangeStartIndex);
			});
		} else {
			this.uncheckAllOptions();
		}

		this.activeIndex -= this.activeIndex > 0 ? 1 : 0;
		this.checkActiveIndex();
	}

	/**
	 * @internal
	 */
	protected override focusAndScrollOptionIntoView() {
		super.focusAndScrollOptionIntoView(this.activeOption);
	}

	/**
	 * In multiple-selection mode:
	 * If any options are selected, the first selected option is checked when
	 * the listbox receives focus. If no options are selected, the first
	 * selectable option is checked.
	 *
	 * @internal
	 */
	override focusinHandler(e: FocusEvent): boolean | void {
		if (!this.multiple) {
			return super.focusinHandler(e);
		}

		if (!this.shouldSkipFocus && e.target === e.currentTarget) {
			this.uncheckAllOptions();

			if (this.activeIndex === -1) {
				this.activeIndex =
					this.firstSelectedOptionIndex !== -1
						? this.firstSelectedOptionIndex
						: 0;
			}

			this.checkActiveIndex();
			this.setSelectedOptions();
			this.focusAndScrollOptionIntoView();
		}

		this.shouldSkipFocus = false;
	}

	/**
	 * Sets an option as selected and gives it focus.
	 *
	 * @public
	 */
	protected override setSelectedOptions() {
		if (!this.multiple) {
			super.setSelectedOptions();
			return;
		}

		if (this.$fastController.isConnected && this.options) {
			this.selectedOptions = this.options.filter((o) => o.selected);
			this.focusAndScrollOptionIntoView();
		}
	}

	/**
	 * Toggles the selected state of the provided options. If any provided items
	 * are in an unselected state, all items are set to selected. If every
	 * provided item is selected, they are all unselected.
	 *
	 * @internal
	 */
	toggleSelectedForAllCheckedOptions() {
		const enabledCheckedOptions = this.checkedOptions.filter(
			(o) => !o.disabled
		);
		const force = !enabledCheckedOptions.every((o) => o.selected);
		enabledCheckedOptions.forEach((o) => (o.selected = force));
		this.selectedIndex = this.options.indexOf(
			enabledCheckedOptions[enabledCheckedOptions.length - 1]
		);

		this.setSelectedOptions();
		this.updateValue(true);
	}

	/**
	 * @internal
	 */
	override typeaheadBufferChanged(prev: string, next: string): void {
		if (!this.multiple) {
			super.typeaheadBufferChanged(prev, next);
			return;
		}

		if (this.$fastController.isConnected) {
			const typeaheadMatches = this.getTypeaheadMatches();
			const activeIndex = this.options.indexOf(typeaheadMatches[0]);
			if (activeIndex > -1) {
				this.activeIndex = activeIndex;
				this.uncheckAllOptions();
				this.checkActiveIndex();
			}

			this.typeaheadExpired = false;
		}
	}

	/**
	 * Unchecks all options.
	 *
	 * @remarks
	 * Multiple-selection mode only.
	 *
	 * @param preserveChecked - reset the rangeStartIndex
	 *
	 * @internal
	 */
	protected uncheckAllOptions(preserveChecked = false): void {
		this.options.forEach((o) => (o.checked = false));
		if (!preserveChecked) {
			this.rangeStartIndex = -1;
		}
	}

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
	 * @internal
	 */
	openChanged(prev: boolean, next: boolean) {
		if (!this.collapsible) {
			return;
		}

		if (this.open) {
			this.focusAndScrollOptionIntoView();
			this.indexWhenOpened = this.selectedIndex;

			// focus is directed to the element when `open` is changed programmatically
			DOM.queueUpdate(() => this.focus());

			return;
		}

		const didClose = prev === true && next === false;
		const selectionChangedWhileOpen =
			this.indexWhenOpened !== this.selectedIndex;
		if (didClose && selectionChangedWhileOpen) {
			this.updateValue(true);
		}
	}

	/**
	 * The selectedIndex when the open property is true.
	 *
	 * @internal
	 */
	private indexWhenOpened!: number;

	/**
	 * The component is collapsible when in single-selection mode.
	 *
	 * @internal
	 */
	@volatile
	get collapsible(): boolean {
		return !this.multiple;
	}

	/**
	 * The ref to the internal `.control` element.
	 *
	 * @internal
	 */
	@observable
	control!: HTMLElement;

	/**
	 * @internal
	 */
	override valueChanged(prev: string, next: string) {
		let nextValue = next;
		if (this.length) {
			const selectedIndex = this._options.findIndex((el) => el.value === next);
			const prevSelectedValue =
				this._options[this.selectedIndex]?.value ?? null;
			const nextSelectedValue = this._options[selectedIndex]?.value ?? null;

			if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
				nextValue = '';
				this.selectedIndex = selectedIndex;
			}

			nextValue = this.firstSelectedOption?.value ?? nextValue;
		}

		if (next !== nextValue) {
			this.value = nextValue;
			return;
		}

		super.valueChanged(prev, next);
		this.updateDisplayValue();
	}

	/**
	 * Sets the value and display value to match the first selected option.
	 *
	 * @param shouldEmit - if true, the input and change events will be emitted
	 *
	 * @internal
	 */
	private updateValue(shouldEmit?: boolean) {
		if (this.$fastController.isConnected) {
			this.value = this.firstSelectedOption?.value ?? '';
		}

		if (shouldEmit) {
			this.$emit('input');
			this.$emit('change', this, {
				bubbles: true,
				composed: undefined,
			});
		}
	}

	/**
	 * Updates the proxy value when the selected index changes.
	 *
	 * @param prev - the previous selected index
	 * @param next - the next selected index
	 *
	 * @internal
	 */
	override selectedIndexChanged(prev: number | undefined, next: number) {
		super.selectedIndexChanged(prev, next);
		this.updateValue();
	}

	/**
	 * Reference to the internal listbox element.
	 *
	 * @internal
	 */
	listbox!: HTMLDivElement;

	/**
	 * The unique id for the internal listbox element.
	 *
	 * @internal
	 */
	listboxId = uniqueId('listbox-');

	/**
	 * The max height for the listbox when opened.
	 *
	 * @internal
	 */
	@observable
	maxHeight = 0;

	/**
	 * Handle opening and closing the listbox when the select is clicked.
	 *
	 * @param e - the mouse event
	 * @internal
	 */
	override clickHandler(e: MouseEvent): boolean | void {
		// do nothing if the select is disabled
		if (this.disabled) {
			return;
		}

		const clickedOption = (e.target as HTMLElement).closest(
			`option,[role=option],[data-vvd-component=option]`
		) as ListboxOption;

		if (clickedOption && clickedOption.disabled) {
			return;
		}

		if (this.multiple) {
			this.uncheckAllOptions();
			this.activeIndex = this.options.indexOf(clickedOption);
			this.checkActiveIndex();
			this.toggleSelectedForAllCheckedOptions();
		} else {
			super.clickHandler(e);
		}

		if (this.collapsible) {
			this.open = !this.open;
		}

		return true;
	}

	/**
	 * Handles focus state when the element or its children lose focus.
	 *
	 * @param e - The focus event
	 * @internal
	 */
	focusoutHandler(e: FocusEvent): boolean | void {
		if (this.multiple) {
			this.uncheckAllOptions();
		}

		if (!this.open) {
			return true;
		}

		const focusTarget = e.relatedTarget as HTMLElement;
		if (this.isSameNode(focusTarget)) {
			this.focus();
			return;
		}

		if (!this.options.includes(focusTarget as ListboxOption)) {
			this.open = false;
			if (this.indexWhenOpened !== this.selectedIndex) {
				this.updateValue(true);
			}
		}
	}

	/**
	 * Updates the value when an option's value changes.
	 *
	 * @param source - the source object
	 * @param propertyName - the property to evaluate
	 *
	 * @internal
	 */
	override handleChange(source: any, propertyName: string) {
		super.handleChange(source, propertyName);
		if (propertyName === 'value') {
			this.updateValue();
		}
	}

	/**
	 * Prevents focus when a scrollbar is clicked.
	 *
	 * @param e - the mouse event object
	 *
	 * @internal
	 */
	override mousedownHandler(e: MouseEvent): boolean | void {
		if (e.offsetX >= 0 && e.offsetX <= this.listbox.scrollWidth) {
			return super.mousedownHandler(e);
		}

		return this.collapsible;
	}

	/**
	 * @internal
	 */
	multipleChanged(_: boolean | undefined, next: boolean) {
		this.options.forEach((o) => {
			o.checked = next ? false : undefined;
		});

		this.setSelectedOptions();

		if (this.proxy) {
			this.proxy.multiple = next;
		}
	}

	/**
	 * Updates the selectedness of each option when the list of selected options changes.
	 *
	 * @param prev - the previous list of selected options
	 * @param next - the current list of selected options
	 *
	 * @internal
	 */
	protected override selectedOptionsChanged(
		prev: ListboxOption[] | undefined,
		next: ListboxOption[]
	) {
		super.selectedOptionsChanged(prev, next);
		this.options.forEach((o, i) => {
			const proxyOption = this.proxy.options.item(i);
			if (proxyOption) {
				proxyOption.selected = o.selected;
			}
		});
	}

	/**
	 * Resets and fills the proxy to match the component's options.
	 *
	 * @internal
	 */
	private setProxyOptions(): void {
		if (this.proxy instanceof HTMLSelectElement && this.options) {
			this.proxy.length = 0;
			this.options.forEach((option) => {
				const proxyOption =
					option.proxy ||
					(option instanceof HTMLOptionElement ? option.cloneNode() : null);

				if (proxyOption) {
					this.proxy.options.add(proxyOption);
				}
			});
		}
	}

	/**
	 * Handles keydown actions when the select is in multiple selection mode.
	 *
	 * @internal
	 */
	multipleKeydownHandler(e: KeyboardEvent) {
		if (this.disabled) {
			return;
		}

		const { key, shiftKey } = e;

		this.shouldSkipFocus = false;

		switch (key) {
			case keyHome: {
				this.checkFirstOption(shiftKey);
				return;
			}

			case keyArrowDown: {
				this.checkNextOption(shiftKey);
				return;
			}

			case keyArrowUp: {
				this.checkPreviousOption(shiftKey);
				return;
			}

			case keyEnd: {
				this.checkLastOption(shiftKey);
				return;
			}

			case keyTab: {
				this.focusAndScrollOptionIntoView();
				return;
			}

			case keyEscape: {
				this.uncheckAllOptions();
				this.checkActiveIndex();
				return;
			}

			// @ts-expect-error fallthrough case
			case keySpace: {
				e.preventDefault();
				if (this.typeaheadExpired) {
					this.toggleSelectedForAllCheckedOptions();
					return;
				}
			}

			// fallthrough:
			default: {
				if (key.length === 1) {
					// Send key to Typeahead handler
					this.handleTypeAhead(`${key}`);
				}
				return;
			}
		}
	}

	/**
	 * Handle keyboard interaction for the select.
	 *
	 * @param e - the keyboard event
	 * @internal
	 */
	override keydownHandler(e: KeyboardEvent): boolean | void {
		const selectedIndexBefore = this.selectedIndex;

		if (this.multiple) {
			this.multipleKeydownHandler(e);
		} else {
			super.keydownHandler(e);
		}

		const key = e.key;

		switch (key) {
			case keySpace: {
				e.preventDefault();
				if (this.collapsible && this.typeaheadExpired) {
					this.open = !this.open;
				}
				break;
			}

			case keyHome:
			case keyEnd: {
				e.preventDefault();
				break;
			}

			case keyEnter: {
				e.preventDefault();
				this.open = !this.open;
				break;
			}

			case keyEscape: {
				if (this.collapsible && this.open) {
					e.preventDefault();
					this.open = false;
				}
				break;
			}

			case keyTab: {
				if (this.collapsible && this.open) {
					e.preventDefault();
					this.open = false;
				}

				return true;
			}
		}

		if (
			this.collapsible &&
			!this.open &&
			this.selectedIndex !== selectedIndexBefore
		) {
			// Selecting an option when closed should update the value immediately
			this.updateValue(true);
		}

		return !(e.key === keyArrowDown || e.key === keyArrowUp);
	}

	override connectedCallback() {
		super.connectedCallback();

		this.addEventListener('focusout', this.focusoutHandler);
		this.addEventListener('contentchange', this.updateDisplayValue);
	}

	override disconnectedCallback() {
		this.removeEventListener('focusout', this.focusoutHandler);
		this.removeEventListener('contentchange', this.updateDisplayValue);

		super.disconnectedCallback();
	}

	/**
	 *
	 * @internal
	 */
	private updateDisplayValue(): void {
		if (this.collapsible) {
			Observable.notify(this, 'displayValue');
		}
	}

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

	get displayValue(): string {
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
		this.options.forEach((o) => {
			const notifier = Observable.getNotifier(o);
			notifier.unsubscribe(this, 'value');
		});

		super.slottedOptionsChanged(prev, next);

		this.options.forEach((o) => {
			const notifier = Observable.getNotifier(o);
			notifier.subscribe(this, 'value');
		});
		this.setProxyOptions();
		this.updateValue();

		const scale = this.getAttribute('scale') || this.scale;
		next.forEach((element) => {
			if (scale) {
				element.setAttribute('scale', scale);
				(element as any).scale = scale;
			}
		});

		// Workaround for bug in FAST:
		// Proxy value is set before options are added to proxy, which causes the value to be discarded
		// Therefore, we need to set the value again and update validation
		this.proxy.value = this.value;

		this.validate();
	}

	override formResetCallback() {
		this.setProxyOptions();
		// Call the base class's implementation setDefaultSelectedOption instead of the select's
		// override, in order to reset the selectedIndex without using the value property.
		super.setDefaultSelectedOption();
		if (this.selectedIndex === -1) {
			this.selectedIndex = 0;
		}

		if (this.placeholder) {
			this.selectedIndex = -1;
		}
	}
}
