import { attr, DOM, emptyArray } from '@microsoft/fast-element';
import { keyEnter } from '@microsoft/fast-web-utilities';
import type { Constructor, MixinType } from '../../utils/mixins';
import { VividElement } from '../vivid-element/vivid-element';

const proxySlotName = 'form-associated-proxy';

const ElementInternalsKey = 'ElementInternals';

export const supportsElementInternals =
	ElementInternalsKey in window &&
	'setFormValue' in window[ElementInternalsKey].prototype;

const InternalsMap = new WeakMap();

/**
 * Available types for the `proxy` property.
 */
export type ProxyElement =
	| HTMLSelectElement
	| HTMLTextAreaElement
	| HTMLInputElement;

/**
 * Mixin to associate components with a form.
 * This mixin also provides the `value`/... properties.
 */
export const FormAssociated = <T extends Constructor<VividElement>>(
	Base: T
) => {
	class FormAssociatedElement extends Base {
		/**
		 * The proxy element - this element serves as the communication layer with the parent form
		 * when form association is not supported by the browser.
		 *
		 * @internal
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
		 */
		get validity(): ValidityState {
			return this.elementInternals
				? this.elementInternals.validity
				: this.proxy.validity;
		}

		/**
		 * Retrieve a reference to the associated form.
		 * Returns null if not associated to any form.
		 */
		get form(): HTMLFormElement | null {
			return this.elementInternals
				? this.elementInternals.form
				: this.proxy.form;
		}

		/**
		 * Retrieve the localized validation message,
		 * or custom validation message if set.
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
		 * @internal
		 */
		dirtyValue = false;

		/**
		 * Stores a reference to the slot element that holds the proxy
		 * element when it is appended.
		 * @internal
		 */
		proxySlot?: HTMLSlotElement;

		/**
		 * The current value of the element.
		 */
		@attr({ attribute: 'current-value' }) value!: string;

		/**
		 * @internal
		 */
		valueChanged(_previous: string, _next: string) {
			this.dirtyValue = true;

			if (this.proxy instanceof HTMLElement) {
				this.proxy.value = this.value;
			}

			this.setFormValue(this.value);
			this.validate();
		}

		/**
		 * @deprecated Use `value` instead.
		 */
		get currentValue() {
			return this.value;
		}
		set currentValue(value: string) {
			this.value = value;
		}

		// This should actually be called `defaultValue` in alignment with the HTML spec:
		/**
		 * The default value of the element. This value sets the `value` property
		 * only when the `value` property has not been explicitly set.
		 *
		 * @remarks
		 * HTML Attribute: value
		 */
		@attr({ mode: 'fromView', attribute: 'value' })
		initialValue: string;

		/**
		 * @internal
		 */
		initialValueChanged(_previous: string, _next: string): void {
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
		@attr({ mode: 'boolean' }) disabled = false;

		/**
		 * @internal
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
		@attr name: string;

		/**
		 * @internal
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
		@attr({ mode: 'boolean' }) required: boolean;

		/**
		 * @internal
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
		 * @internal
		 */
		get elementInternals(): ElementInternals | null {
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
		 * @internal
		 */
		proxyEventsToBlock = ['change', 'click'];

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
		 * @internal
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
		 * @internal
		 */
		formDisabledCallback(disabled: boolean): void {
			this.disabled = disabled;
		}

		/**
		 * @internal
		 */
		formResetCallback(): void {
			this.value = this.initialValue;
			this.dirtyValue = false;
		}

		/**
		 * @internal
		 */
		proxyInitialized = false;

		/**
		 * Attach the proxy element to the DOM
		 * @internal
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
		 * @internal
		 */
		detachProxy(): void {
			this.removeChild(this.proxy);
			this.shadowRoot!.removeChild(this.proxySlot as HTMLSlotElement);
		}

		/**
		 * Sets the validity of the custom element. By default this uses the proxy element to determine
		 * validity, but this can be extended or replaced in implementation.
		 *
		 * @param anchor - The anchor element to provide to ElementInternals.setValidity for surfacing the browser's constraint validation UI
		 * @internal
		 */
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
		 * @internal
		 */
		setFormValue(
			value: File | string | FormData | null,
			state?: File | string | FormData | null
		): void {
			if (this.elementInternals) {
				this.elementInternals.setFormValue(value, state || value);
			}
		}

		/**
		 * @internal
		 */
		_keypressHandler(e: KeyboardEvent): void {
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
		 * @internal
		 */
		stopPropagation(e: Event): void {
			e.stopPropagation();
		}
	}

	return FormAssociatedElement;
};

export type FormAssociatedElement = MixinType<typeof FormAssociated>;

/**
 * `current-checked` is inexplicably not a boolean attribute, so we need to convert from "true"/"false" to boolean.
 */
const currentCheckedConverter = {
	fromView(value: any): boolean {
		if (typeof value === 'string') {
			return value.toLowerCase() === 'true';
		}
		return !!value;
	},
	toView(value: boolean): string {
		return value ? 'true' : 'false';
	},
};

/**
 * Extends FormAssociated to provide `checked`/....
 */
export const CheckableFormAssociated = <T extends Constructor<VividElement>>(
	Base: T
) => {
	class CheckableFormAssociatedElement extends FormAssociated(Base) {
		/**
		 * Tracks whether the "checked" property has been changed.
		 * This is necessary to provide consistent behavior with
		 * normal input checkboxes
		 * @internal
		 */
		dirtyChecked = false;

		/**
		 * The default checkedness of the element. This value sets the `checked` property
		 * only when the `checked` property has not been explicitly set.
		 *
		 * @public
		 * @remarks
		 * HTML Attribute: checked
		 */
		@attr({
			attribute: 'checked',
			mode: 'boolean',
		})
		defaultChecked = false;

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
		 * The current checkedness of the element.
		 *
		 * @public
		 */
		@attr({ attribute: 'current-checked', converter: currentCheckedConverter })
		checked!: boolean;

		/**
		 * @internal
		 */
		checkedChanged(prev: boolean | undefined, _next: boolean): void {
			if (!this.dirtyChecked) {
				this.dirtyChecked = true;
			}

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
		 * @deprecated Use `defaultChecked` instead.
		 */
		get checkedAttribute() {
			return this.defaultChecked;
		}
		set checkedAttribute(value: boolean) {
			this.defaultChecked = value;
		}

		/**
		 * @deprecated Use `checked` instead.
		 */
		get currentChecked() {
			return this.checked;
		}
		set currentChecked(value: boolean) {
			this.checked = value;
		}

		/**
		 * @internal
		 */
		updateForm(): void {
			const value = this.checked ? this.value : null;
			this.setFormValue(value, value);
		}

		/**
		 * @internal
		 */
		override connectedCallback() {
			super.connectedCallback();
			this.updateForm();
		}

		/**
		 * @internal
		 */
		override formResetCallback() {
			super.formResetCallback();
			this.checked = !!this.defaultChecked;
			this.dirtyChecked = false;
		}
	}

	return CheckableFormAssociatedElement;
};
