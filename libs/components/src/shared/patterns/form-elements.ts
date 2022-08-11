import {attr, observable, volatile} from '@microsoft/fast-element';

export interface FormElement {
	charCount: boolean;
	errorValidationMessage: boolean;
	helperText: string;
	label: string;
	userValid: boolean;
}
export function formElements<T extends { new (...args: any[]): Record<string, any> }>(constructor: T) {
	class Decorated extends constructor {
		@attr label?: string;
		@attr({attribute: 'helper-text'}) helperText?: string;
		@attr({
			attribute: 'char-count',
			mode: 'boolean'
		}) charCount = false;
		@observable userValid = true;
		#blurred = false;

		@volatile
		get errorValidationMessage() {
			return this.userValid ? '' : this.validationMessage;
		}

		constructor(...args: any[]) {
			super(...args);
			(this as unknown as HTMLElement).addEventListener('blur', () => {
				this.#blurred = true;
				this.validate();
			});
			(this as unknown as HTMLElement).addEventListener('focus', () => {
				this.#blurred = false;
			});
		}

		validate = () => {
			this.userValid = !this.userValid;
			if (this.proxy instanceof HTMLElement) {
				this.userValid = (this.#blurred && this.dirtyValue) ? !this.validationMessage : true;
			}
		};
	}

	return Decorated;
}
