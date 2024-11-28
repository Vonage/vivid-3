import {
	attr,
	DOM,
	observable,
	Observable,
	volatile,
} from '@microsoft/fast-element';
import {
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
import { FormAssociatedSelect } from './select.form-associated';

export type SelectAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;
export type SelectShape = Extract<Shape, Shape.Rounded | Shape.Pill>;
export type SelectSize = Extract<Size, Size.Condensed | Size.Normal>;

/**
 * Positioning directions for the listbox when a select is open.
 * @public
 */
export const SelectPosition = {
	above: 'above',
	below: 'below',
} as const;

/**
 * Types for positioning the select element listbox when open
 * @public
 */
export type SelectPosition = typeof SelectPosition[keyof typeof SelectPosition];

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
export class Select extends FormAssociatedSelect {
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
	 * Sets focus and synchronizes ARIA attributes when the open property changes.
	 *
	 * @internal
	 */
	openChanged() {
		if (!this.collapsible) {
			return;
		}

		if (this.open) {
			this.ariaControls = this.listboxId;
			this.ariaExpanded = 'true';

			this.setPositioning();
			this.focusAndScrollOptionIntoView();
			this.indexWhenOpened = this.selectedIndex;

			// focus is directed to the element when `open` is changed programmatically
			DOM.queueUpdate(() => this.focus());

			return;
		}

		this.ariaControls = '';
		this.ariaExpanded = 'false';
	}

	/**
	 * The selectedIndex when the open property is true.
	 *
	 * @internal
	 */
	private indexWhenOpened!: number;

	/**
	 * The internal value property.
	 *
	 * @internal
	 */
	private _value!: string;

	/**
	 * The component is collapsible when in single-selection mode with no size attribute.
	 *
	 * @internal
	 */
	@volatile
	get collapsible(): boolean {
		return !(this.multiple || typeof this.size === 'number');
	}

	/**
	 * The ref to the internal `.control` element.
	 *
	 * @internal
	 */
	@observable
	control!: HTMLElement;

	/**
	 * The value property.
	 *
	 * @public
	 */
	override get value() {
		Observable.track(this, 'value');
		return this._value;
	}

	override set value(next: string) {
		const prev = `${this._value}`;

		if (this._options?.length) {
			const selectedIndex = this._options.findIndex((el) => el.value === next);
			const prevSelectedValue =
				this._options[this.selectedIndex]?.value ?? null;
			const nextSelectedValue = this._options[selectedIndex]?.value ?? null;

			if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
				next = '';
				this.selectedIndex = selectedIndex;
			}

			next = this.firstSelectedOption?.value ?? next;
		}

		if (prev !== next) {
			this._value = next;
			super.valueChanged(prev, next);
			Observable.notify(this, 'value');
			this.updateDisplayValue();
		}
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
	 * Reflects the placement for the listbox when the select is open.
	 *
	 * @public
	 */
	@attr({ attribute: 'position' })
	positionAttribute?: SelectPosition;

	/**
	 * Indicates the initial state of the position attribute.
	 *
	 * @internal
	 */
	private forcedPosition = false;

	/**
	 * Holds the current state for the calculated position of the listbox.
	 *
	 * @public
	 */
	@observable
	position?: SelectPosition;
	protected positionChanged(
		_: SelectPosition | undefined,
		next: SelectPosition | undefined
	): void {
		this.positionAttribute = next;
		this.setPositioning();
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
	 * Calculate and apply listbox positioning based on available viewport space.
	 *
	 * @public
	 */
	setPositioning() {
		const currentBox = this.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const availableBottom = viewportHeight - currentBox.bottom;

		this.position = this.forcedPosition
			? this.positionAttribute
			: currentBox.top > availableBottom
			? SelectPosition.above
			: SelectPosition.below;

		this.positionAttribute = this.forcedPosition
			? this.positionAttribute
			: this.position;

		this.maxHeight =
			this.position === SelectPosition.above
				? ~~currentBox.top
				: ~~availableBottom;
	}

	/**
	 * The max height for the listbox when opened.
	 *
	 * @internal
	 */
	@observable
	maxHeight = 0;

	/**
	 * Synchronize the `aria-disabled` property when the `disabled` property changes.
	 *
	 * @param prev - The previous disabled value
	 * @param next - The next disabled value
	 *
	 * @internal
	 */
	override disabledChanged(prev: boolean, next: boolean) {
		if (super.disabledChanged) {
			super.disabledChanged(prev, next);
		}
		this.ariaDisabled = this.disabled ? 'true' : 'false';
	}

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

		if (this.open) {
			const captured = (e.target as HTMLElement).closest(
				`option,[role=option]`
			) as ListboxOption;

			if (captured && captured.disabled) {
				return;
			}
		}

		super.clickHandler(e);

		this.open = this.collapsible && !this.open;

		if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
			this.updateValue(true);
		}

		return true;
	}

	/**
	 * Handles focus state when the element or its children lose focus.
	 *
	 * @param e - The focus event
	 * @internal
	 */
	override focusoutHandler(e: FocusEvent): boolean | void {
		super.focusoutHandler(e);

		if (!this.open) {
			return true;
		}

		const focusTarget = e.relatedTarget as HTMLElement;
		if (this.isSameNode(focusTarget)) {
			this.focus();
			return;
		}

		if (!this.options?.includes(focusTarget as ListboxOption)) {
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
	 * Prevents focus when size is set and a scrollbar is clicked.
	 *
	 * @param e - the mouse event object
	 *
	 * @internal
	 */
	override mousedownHandler(e: MouseEvent): boolean | void {
		if (e.offsetX >= 0 && e.offsetX <= this.listbox?.scrollWidth) {
			return super.mousedownHandler(e);
		}

		return this.collapsible;
	}

	/**
	 * Sets the multiple property on the proxy element.
	 *
	 * @param prev - the previous multiple value
	 * @param next - the current multiple value
	 */
	override multipleChanged(prev: boolean | undefined, next: boolean) {
		super.multipleChanged(prev, next);

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
		this.options?.forEach((o, i) => {
			const proxyOption = this.proxy?.options.item(i);
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
			this.proxy.options.length = 0;
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
	 * Handle keyboard interaction for the select.
	 *
	 * @param e - the keyboard event
	 * @internal
	 */
	override keydownHandler(e: KeyboardEvent): boolean | void {
		super.keydownHandler(e);
		const key = e.key || e.key.charCodeAt(0);

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

		if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
			this.updateValue(true);
			this.indexWhenOpened = this.selectedIndex;
		}

		return !(key === keyArrowDown || key === keyArrowUp);
	}

	override connectedCallback() {
		super.connectedCallback();
		this.forcedPosition = !!this.positionAttribute;

		this.addEventListener('contentchange', this.updateDisplayValue);
	}

	override disconnectedCallback() {
		this.removeEventListener('contentchange', this.updateDisplayValue);
		super.disconnectedCallback();
	}

	/**
	 * Updates the proxy's size property when the size attribute changes.
	 *
	 * @param prev - the previous size
	 * @param next - the current size
	 *
	 * @internal
	 */
	protected override sizeChanged(prev: number | undefined, next: number) {
		super.sizeChanged(prev, next);

		if (this.proxy) {
			this.proxy.size = next;
		}
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

	labelChanged() {
		if (!this.ariaLabel) {
			this.ariaLabel = this.label;
		}
	}

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

/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export class DelegatesARIASelect {
	/**
	 * See {@link https://www.w3.org/TR/wai-aria-1.2/#combobox} for more information
	 * @public
	 * @remarks
	 * HTML Attribute: `aria-controls`
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	ariaControls: string | null;
}

export interface Select
	extends AffixIconWithTrailing,
		FormElement,
		FormElementHelperText,
		ErrorText,
		FormElementSuccessText,
		DelegatesARIASelect {}
applyMixinsWithObservables(
	Select,
	AffixIconWithTrailing,
	FormElementHelperText,
	FormElementSuccessText,
	DelegatesARIASelect
);
