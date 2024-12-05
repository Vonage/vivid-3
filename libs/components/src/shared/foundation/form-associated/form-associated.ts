import type { Constructable, FASTElement } from '@microsoft/fast-element';
import {
	attr,
	booleanConverter,
	DOM,
	emptyArray,
	observable,
} from '@microsoft/fast-element';
import { keyEnter } from '@microsoft/fast-web-utilities';

const proxySlotName = 'form-associated-proxy';

const ElementInternalsKey = 'ElementInternals';
/**
 * @alpha
 */
export const supportsElementInternals =
	ElementInternalsKey in window &&
	'setFormValue' in window[ElementInternalsKey].prototype;

const InternalsMap = new WeakMap();

/**
 * Base class for providing Custom Element Form Association.
 *
 * @alpha
 */
export interface FormAssociated extends Omit<ElementInternals, 'labels'> {
	dirtyValue: boolean;
	disabled: boolean;
	readonly elementInternals: ElementInternals | null;
	readonly formAssociated: boolean;
	initialValue: string;
	readonly labels: ReadonlyArray<Node[]>;
	name: string;
	required: boolean;
	value: string;
	currentValue: string;
	attachProxy(): void;
	detachProxy(): void;
	disabledChanged?(previous: boolean, next: boolean): void;
	formDisabledCallback?(disabled: boolean): void;
	formResetCallback(): void;
	initialValueChanged?(previous: string, next: string): void;
	nameChanged?(previous: string, next: string): void;
	requiredChanged(prev: boolean, next: boolean): void;
	stopPropagation(e: Event): void;

	/**
	 * Sets the validity of the custom element. By default this uses the proxy element to determine
	 * validity, but this can be extended or replaced in implementation.
	 *
	 * @param anchor - The anchor element to provide to ElementInternals.setValidity for surfacing the browser's constraint validation UI
	 */
	validate(anchor?: HTMLElement): void;
	valueChanged(previous: string, next: string): void;
}

/**
 * Base class for providing Custom Element Form Association with checkable features.
 *
 * @alpha
 */
export interface CheckableFormAssociated extends FormAssociated {
	currentChecked: boolean;
	dirtyChecked: boolean;
	checkedAttribute: boolean;
	defaultChecked: boolean;
	defaultCheckedChanged(oldValue: boolean | undefined, newValue: boolean): void;
	checked: boolean;
	checkedChanged(oldValue: boolean | undefined, newValue: boolean): void;
}

/**
 * Avaiable types for the `proxy` property.
 * @alpha
 */
export type ProxyElement =
	| HTMLSelectElement
	| HTMLTextAreaElement
	| HTMLInputElement;

/**
 * Identifies a class as having a proxy element and optional submethods related
 * to the proxy element.
 *
 * @alpha
 */
export interface FormAssociatedProxy {
	proxy: ProxyElement;
	disabledChanged?(previous: boolean, next: boolean): void;
	formDisabledCallback?(disabled: boolean): void;
	formResetCallback?(): void;
	initialValueChanged?(previous: string, next: string): void;
	valueChanged?(previous: string, next: string): void;
	nameChanged?(previous: string, next: string): void;
}

/**
 * Combined type to describe a Form-associated element.
 *
 * @alpha
 */
export type FormAssociatedElement = FormAssociated &
	FASTElement &
	HTMLElement &
	FormAssociatedProxy;

/**
 * Combined type to describe a checkable Form-associated element.
 *
 * @alpha
 */
export type CheckableFormAssociatedElement = FormAssociatedElement &
	CheckableFormAssociated & { proxy: HTMLInputElement };

/**
 * Combined type to describe a Constructable Form-Associated type.
 *
 * @alpha
 */
export type ConstructableFormAssociated = Constructable<
	HTMLElement & FASTElement
>;

/**
 * Base function for providing Custom Element Form Association.
 *
 * @alpha
 */
export function FormAssociated<T extends ConstructableFormAssociated>(
	BaseCtor: T
): T {
	const C = class extends BaseCtor {
		/**
		 * The proxy element - this element serves as the communication layer with the parent form
		 * when form association is not supported by the browser.
		 *
		 * @alpha
		 */
		proxy!: ProxyElement;

		/**
		 * Must evaluate to true to enable elementInternals.
		 * Feature detects API support and resolve respectively
		 *
		 * @internal
		 */
		static get formAssociated(): boolean {
			return supportsElementInternals;
		}

		/**
		 * Returns the validity state of the element
		 *
		 * @alpha
		 */
		get validity(): ValidityState {
			return this.elementInternals
				? this.elementInternals.validity
				: this.proxy.validity;
		}

		/**
		 * Retrieve a reference to the associated form.
		 * Returns null if not associated to any form.
		 *
		 * @alpha
		 */
		get form(): HTMLFormElement | null {
			return this.elementInternals
				? this.elementInternals.form
				: this.proxy.form;
		}

		/**
		 * Retrieve the localized validation message,
		 * or custom validation message if set.
		 *
		 * @alpha
		 */
		get validationMessage(): string {
			return this.elementInternals
				? this.elementInternals.validationMessage
				: this.proxy.validationMessage;
		}

		/**
		 * Whether the element will be validated when the
		 * form is submitted
		 */
		get willValidate(): boolean {
			return this.elementInternals
				? this.elementInternals.willValidate
				: this.proxy.willValidate;
		}

		/**
		 * A reference to all associated label elements
		 */
		get labels(): ReadonlyArray<Node> {
			if (this.elementInternals) {
				return Object.freeze(Array.from(this.elementInternals.labels));
			} else if (
				this.proxy instanceof HTMLElement &&
				this.proxy.ownerDocument &&
				this.id
			) {
				// Labels associated by wrapping the element: <label><custom-element></custom-element></label>
				const parentLabels = this.proxy.labels!;
				// Labels associated using the `for` attribute
				const forLabels = Array.from(
					(
						this.proxy.getRootNode() as HTMLDocument | ShadowRoot
					).querySelectorAll(`[for='${this.id}']`)
				);

				return Object.freeze(forLabels.concat(Array.from(parentLabels)));
			} else {
				return emptyArray;
			}
		}

		/**
		 * Track whether the value has been changed from the initial value
		 */
		dirtyValue = false;

		/**
		 * Stores a reference to the slot element that holds the proxy
		 * element when it is appended.
		 */
		proxySlot?: HTMLSlotElement;

		/**
		 * The value of the element to be associated with the form.
		 */
		value!: string;

		/**
		 * Invoked when the `value` property changes
		 *
		 * @remarks
		 * If elements extending `FormAssociated` implement a `valueChanged` method
		 * They must be sure to invoke `super.valueChanged(previous, next)` to ensure
		 * proper functioning of `FormAssociated`
		 */
		valueChanged(_previous: string, _next: string) {
			this.dirtyValue = true;

			if (this.proxy instanceof HTMLElement) {
				this.proxy.value = this.value;
			}

			this.currentValue = this.value;

			this.setFormValue(this.value);
			this.validate();
		}

		/**
		 * The current value of the element. This property serves as a mechanism
		 * to set the `value` property through both property assignment and the
		 * .setAttribute() method. This is useful for setting the field's value
		 * in UI libraries that bind data through the .setAttribute() API
		 * and don't support IDL attribute binding.
		 */
		currentValue!: string;
		currentValueChanged() {
			this.value = this.currentValue;
		}

		/**
		 * The initial value of the form. This value sets the `value` property
		 * only when the `value` property has not been explicitly set.
		 *
		 * @remarks
		 * HTML Attribute: value
		 */
		initialValue: string;

		/**
		 * Invoked when the `initialValue` property changes
		 *
		 * @remarks
		 * If elements extending `FormAssociated` implement a `initialValueChanged` method
		 * They must be sure to invoke `super.initialValueChanged(previous, next)` to ensure
		 * proper functioning of `FormAssociated`
		 */
		initialValueChanged(_previous: string, _next: string): void {
			// If the value is clean and the component is connected to the DOM
			// then set value equal to the attribute value.
			if (!this.dirtyValue) {
				this.value = this.initialValue;
				this.dirtyValue = false;
			}
		}

		/**
		 * Sets the element's disabled state. A disabled element will not be included during form submission.
		 *
		 * @remarks
		 * HTML Attribute: disabled
		 */
		disabled = false;

		/**
		 * Invoked when the `disabled` property changes
		 *
		 * @remarks
		 * If elements extending `FormAssociated` implement a `disabledChanged` method
		 * They must be sure to invoke `super.disabledChanged(previous, next)` to ensure
		 * proper functioning of `FormAssociated`
		 */
		disabledChanged(_previous: boolean, _next: boolean): void {
			if (this.proxy instanceof HTMLElement) {
				this.proxy.disabled = this.disabled;
			}

			DOM.queueUpdate(() => this.classList.toggle('disabled', this.disabled));
		}

		/**
		 * The name of the element. This element's value will be surfaced during form submission under the provided name.
		 *
		 * @remarks
		 * HTML Attribute: name
		 */
		//@ts-expect-error: Type is incorrectly non-optional
		name: string;

		/**
		 * Invoked when the `name` property changes
		 *
		 * @remarks
		 * If elements extending `FormAssociated` implement a `nameChanged` method
		 * They must be sure to invoke `super.nameChanged(previous, next)` to ensure
		 * proper functioning of `FormAssociated`
		 */
		nameChanged(_previous: string, _next: string): void {
			if (this.proxy instanceof HTMLElement) {
				this.proxy.name = this.name;
			}
		}

		/**
		 * Require the field to be completed prior to form submission.
		 *
		 * @remarks
		 * HTML Attribute: required
		 */
		required: boolean;

		/**
		 * Invoked when the `required` property changes
		 *
		 * @remarks
		 * If elements extending `FormAssociated` implement a `requiredChanged` method
		 * They must be sure to invoke `super.requiredChanged(previous, next)` to ensure
		 * proper functioning of `FormAssociated`
		 */
		requiredChanged(_previous: boolean, _next: boolean): void {
			if (this.proxy instanceof HTMLElement) {
				this.proxy.required = this.required;
			}

			DOM.queueUpdate(() => this.classList.toggle('required', this.required));
			this.validate();
		}

		/**
		 * The element internals object. Will only exist
		 * in browsers supporting the attachInternals API
		 */
		private get elementInternals(): ElementInternals | null {
			if (!supportsElementInternals) {
				return null;
			}

			let internals = InternalsMap.get(this);

			if (!internals) {
				internals = (this as any).attachInternals();
				InternalsMap.set(this, internals);
			}

			return internals;
		}

		/**
		 * These are events that are still fired by the proxy
		 * element based on user / programmatic interaction.
		 *
		 * The proxy implementation should be transparent to
		 * the app author, so block these events from emitting.
		 */
		protected proxyEventsToBlock = ['change', 'click'];

		constructor(...args: any[]) {
			super(...args);

			this.required = false;
			// @ts-expect-error used before initialized
			this.initialValue = this.initialValue || '';

			if (!this.elementInternals) {
				// When elementInternals is not supported, formResetCallback is
				// bound to an event listener, so ensure the handler's `this`
				// context is correct.
				this.formResetCallback = this.formResetCallback.bind(this);
			}
		}

		/**
		 * @internal
		 */
		override connectedCallback(): void {
			super.connectedCallback();

			this.addEventListener('keypress', this._keypressHandler);

			if (!this.value) {
				this.value = this.initialValue;
				this.dirtyValue = false;
			}

			if (!this.elementInternals) {
				this.attachProxy();

				if (this.form) {
					this.form.addEventListener('reset', this.formResetCallback);
				}
			}
		}

		/**
		 * @internal
		 */
		override disconnectedCallback(): void {
			super.disconnectedCallback();

			this.proxyEventsToBlock.forEach((name) =>
				this.proxy.removeEventListener(name, this.stopPropagation)
			);

			if (!this.elementInternals && this.form) {
				this.form.removeEventListener('reset', this.formResetCallback);
			}
		}

		/**
		 * Return the current validity of the element.
		 */
		checkValidity(): boolean {
			return this.elementInternals
				? this.elementInternals.checkValidity()
				: this.proxy.checkValidity();
		}

		/**
		 * Return the current validity of the element.
		 * If false, fires an invalid event at the element.
		 */
		reportValidity(): boolean {
			return this.elementInternals
				? this.elementInternals.reportValidity()
				: this.proxy.reportValidity();
		}

		/**
		 * Set the validity of the control. In cases when the elementInternals object is not
		 * available (and the proxy element is used to report validity), this function will
		 * do nothing unless a message is provided, at which point the setCustomValidity method
		 * of the proxy element will be invoked with the provided message.
		 * @param flags - Validity flags
		 * @param message - Optional message to supply
		 * @param anchor - Optional element used by UA to display an interactive validation UI
		 */
		setValidity(
			flags: ValidityStateFlags,
			message?: string,
			anchor?: HTMLElement
		): void {
			if (this.elementInternals) {
				this.elementInternals.setValidity(flags, message, anchor);
			} else if (typeof message === 'string') {
				this.proxy.setCustomValidity(message);
			}
		}

		/**
		 * Invoked when a connected component's form or fieldset has its disabled
		 * state changed.
		 * @param disabled - the disabled value of the form / fieldset
		 */
		formDisabledCallback(disabled: boolean): void {
			this.disabled = disabled;
		}

		formResetCallback(): void {
			this.value = this.initialValue;
			this.dirtyValue = false;
		}

		protected proxyInitialized = false;

		/**
		 * Attach the proxy element to the DOM
		 */
		attachProxy(): void {
			if (!this.proxyInitialized) {
				this.proxyInitialized = true;
				this.proxy.style.display = 'none';
				this.proxyEventsToBlock.forEach((name) =>
					this.proxy.addEventListener(name, this.stopPropagation)
				);

				// These are typically mapped to the proxy during
				// property change callbacks, but during initialization
				// on the initial call of the callback, the proxy is
				// still undefined. We should find a better way to address this.
				this.proxy.disabled = this.disabled;
				this.proxy.required = this.required;
				if (typeof this.name === 'string') {
					this.proxy.name = this.name;
				}

				if (typeof this.value === 'string') {
					this.proxy.value = this.value;
				}

				this.proxy.setAttribute('slot', proxySlotName);

				this.proxySlot = document.createElement('slot');
				this.proxySlot.setAttribute('name', proxySlotName);
			}

			this.shadowRoot!.appendChild(this.proxySlot as HTMLSlotElement);
			this.appendChild(this.proxy);
		}

		/**
		 * Detach the proxy element from the DOM
		 */
		detachProxy(): void {
			this.removeChild(this.proxy);
			this.shadowRoot!.removeChild(this.proxySlot as HTMLSlotElement);
		}

		/** {@inheritDoc (FormAssociated:interface).validate} */
		validate(anchor?: HTMLElement): void {
			if (this.proxy instanceof HTMLElement && this.elementInternals) {
				const isValid = this.proxy.validity.valid;
				const control = (this as any).control;

				/**
				 * Special handling of min/maxlength validation.
				 * HTML has the insane behaviour of min/maxlength constraints only being active after a user interacted with the
				 * field. Our proxy is never interacted with, so the constraint never applies.
				 * Therefore, we need to use the validity from the actual control in this case.
				 */
				const controlIsInvalidDueToMinOrMaxLength =
					control &&
					control.validity &&
					!control.validity.valid &&
					(control.validity.tooShort || control.validity.tooLong);

				if (isValid && controlIsInvalidDueToMinOrMaxLength) {
					this.setValidity(control.validity, control.validationMessage, anchor);
				} else {
					this.setValidity(
						this.proxy.validity,
						this.proxy.validationMessage,
						anchor
					);
				}
			}
		}

		/**
		 * Associates the provided value (and optional state) with the parent form.
		 * @param value - The value to set
		 * @param state - The state object provided to during session restores and when autofilling.
		 */
		setFormValue(
			value: File | string | FormData | null,
			state?: File | string | FormData | null
		): void {
			if (this.elementInternals) {
				this.elementInternals.setFormValue(value, state || value);
			}
		}

		private _keypressHandler(e: KeyboardEvent): void {
			switch (e.key) {
				case keyEnter:
					if (this.form instanceof HTMLFormElement) {
						// Implicit submission
						const defaultButton = this.form.querySelector(
							'[type=submit]'
						) as HTMLElement | null;
						defaultButton?.click();
					}
					break;
			}
		}

		/**
		 * Used to stop propagation of proxy element events
		 * @param e - Event object
		 */
		stopPropagation(e: Event): void {
			e.stopPropagation();
		}
	};

	attr({ mode: 'boolean' })(C.prototype, 'disabled');
	attr({ mode: 'fromView', attribute: 'value' })(C.prototype, 'initialValue');
	attr({ attribute: 'current-value' })(C.prototype, 'currentValue');
	attr(C.prototype, 'name');
	attr({ mode: 'boolean' })(C.prototype, 'required');
	observable(C.prototype, 'value');

	return C;
}

/**
 * @alpha
 */
export function CheckableFormAssociated<T extends ConstructableFormAssociated>(
	BaseCtor: T
): T {
	interface C extends FormAssociatedElement {}
	class C extends FormAssociated(BaseCtor) {}
	class D extends C {
		/**
		 * Tracks whether the "checked" property has been changed.
		 * This is necessary to provide consistent behavior with
		 * normal input checkboxes
		 */
		protected dirtyChecked = false;

		/**
		 * Provides the default checkedness of the input element
		 * Passed down to proxy
		 *
		 * @public
		 * @remarks
		 * HTML Attribute: checked
		 */
		checkedAttribute = false;
		/**
		 * @internal
		 */
		checkedAttributeChanged(): void {
			this.defaultChecked = this.checkedAttribute;
		}

		// @ts-expect-error: Type is incorrectly non-optional
		defaultChecked: boolean;

		/**
		 * @internal
		 */
		defaultCheckedChanged(): void {
			if (!this.dirtyChecked) {
				// Setting this.checked will cause us to enter a dirty state,
				// but if we are clean when defaultChecked is changed, we want to stay
				// in a clean state, so reset this.dirtyChecked
				this.checked = this.defaultChecked;
				this.dirtyChecked = false;
			}
		}

		/**
		 * The checked state of the control.
		 *
		 * @public
		 */
		checked = false;
		checkedChanged(prev: boolean | undefined, _next: boolean): void {
			if (!this.dirtyChecked) {
				this.dirtyChecked = true;
			}

			this.currentChecked = this.checked;
			this.updateForm();

			if (this.proxy instanceof HTMLInputElement) {
				this.proxy.checked = this.checked;
			}

			if (prev !== undefined) {
				this.$emit('change');
			}

			this.validate();
		}

		/**
		 * The current checkedness of the element. This property serves as a mechanism
		 * to set the `checked` property through both property assignment and the
		 * .setAttribute() method. This is useful for setting the field's checkedness
		 * in UI libraries that bind data through the .setAttribute() API
		 * and don't support IDL attribute binding.
		 */
		// @ts-expect-error: Type is incorrectly non-optional
		currentChecked: boolean;
		currentCheckedChanged(_prev: boolean | undefined, _next: boolean) {
			this.checked = this.currentChecked;
		}

		constructor(...args: any[]) {
			super(args);

			// Re-initialize dirtyChecked because initialization of other values
			// causes it to become true
			this.dirtyChecked = false;
		}

		private updateForm(): void {
			const value = this.checked ? this.value : null;
			this.setFormValue(value, value);
		}

		override connectedCallback() {
			super.connectedCallback();
			this.updateForm();
		}

		override formResetCallback() {
			super.formResetCallback();
			this.checked = !!this.checkedAttribute;
			this.dirtyChecked = false;
		}
	}

	attr({ attribute: 'checked', mode: 'boolean' })(
		D.prototype,
		'checkedAttribute'
	);
	attr({ attribute: 'current-checked', converter: booleanConverter })(
		D.prototype,
		'currentChecked'
	);
	observable(D.prototype, 'defaultChecked');
	observable(D.prototype, 'checked');

	return D;
}
