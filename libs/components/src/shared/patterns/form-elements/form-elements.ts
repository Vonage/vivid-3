import { attr, observable } from '@microsoft/fast-element';

export interface FormElement {
	errorValidationMessage: string;
	label: string;
	userValid: boolean;
	dirtyValue: boolean;
}

export interface FormElementSuccessText {
	successText?: string;
}

export interface FormElementCharCount {
	charCount: boolean;
}

export interface ErrorText {
	errorText: string;
}

export class FormElementSuccessText {
	@attr({ attribute: 'success-text' }) successText?: string;
}

export class FormElementCharCount {
	@attr({
		attribute: 'char-count',
		mode: 'boolean',
	})
	charCount = false;
}

export function formElements<
	T extends { new (...args: any[]): Record<string, any> }
>(constructor: T) {
	class FormElement extends constructor {
		@attr label?: string;

		/**
		 * Will hold the error message that should currently be visible in the UI.
		 * Note: Cannot be a getter because this.validationMessage is not observable
		 */
		@observable errorValidationMessage = '';

		forceErrorDisplay = false;
		hasBeenTouched = false;

		constructor(...args: any[]) {
			super(...args);
			(this as unknown as HTMLElement).addEventListener('blur', () => {
				this.hasBeenTouched = true;
				this.forceErrorDisplay = false;
				this.validate();
			});
			(this as unknown as HTMLElement).addEventListener('focus', () => {
				this.hasBeenTouched = false;
			});
			this.addEventListener('invalid', () => {
				this.proxy.dispatchEvent(new Event('invalid'));
			});
		}

		connectedCallback() {
			super.connectedCallback();
			this.proxy.addEventListener('invalid', this.#handleInvalidEvent);
		}

		#handleInvalidEvent = () => {
			this.forceErrorDisplay = true;
			this.validate();
		};

		disconnectedCallback() {
			super.disconnectedCallback();
			this.proxy.removeEventListener('invalid', this.#handleInvalidEvent);
		}

		formResetCallback() {
			this.forceErrorDisplay = false;

			super.formResetCallback();

			// super.formResetCallback will reset the value, which triggers validate(), and only afterward clear dirtyValue
			// Therefore, we need to validate again now that dirtyValue has changed
			this.validate();
		}

		validate() {
			super.validate();

			const shouldShowValidationError =
				this.forceErrorDisplay || (this.hasBeenTouched && this.dirtyValue);

			this.errorValidationMessage = shouldShowValidationError
				? this.validationMessage
				: '';
		}
	}

	return FormElement;
}

export function errorText<
	T extends { new (...args: any[]): Record<string, any> }
>(constructor: T) {
	class ErrorText extends constructor {
		@attr({ attribute: 'error-text' }) errorText?: string;
		errorTextChanged(_: string, newErrorText: string | undefined) {
			if (newErrorText) {
				this.#forceCustomError(newErrorText);
			} else {
				this.#clearCustomErrorAndRevalidate();
			}
		}

		#blockValidateCalls = false;

		constructor(...args: any[]) {
			super(...args);
			this._validate = this.validate;
			this.validate = () => {
				if (!this.#blockValidateCalls) this._validate();
			};
		}

		#forceCustomError(errorMessage: string) {
			this.setValidity({ customError: true }, errorMessage, this.control);
			this.errorValidationMessage = errorMessage;

			this.#blockValidateCalls = true;
		}

		#clearCustomErrorAndRevalidate() {
			this.setValidity({}, '', this.control);
			this.#blockValidateCalls = false;

			this.validate();
		}
	}

	return ErrorText;
}
