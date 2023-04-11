import {attr} from '@microsoft/fast-element';

export interface ForceError {
	forceError: string;
}

/**
 * @param constructor
 */
export function forceError<T extends { new (...args: any[]): Record<string, any> }>(constructor: T) {
	class Decorated extends constructor {
		@attr({ attribute: 'force-error' }) forceError?: string;
		#shouldValidate = true;
		#prevSuccessText = '';

		constructor(...args: any[]) {
			super(...args);
			this._validate = this.validate;
			this.validate = () => {
				if (this.#shouldValidate) this._validate();
			};
		}

		forceErrorChanged(_: string, newmsg: string | undefined) {
			if (newmsg) {
				this.setValidity({ customError: true }, newmsg, this.control);
				this.#prevSuccessText = this.successText;
				this.successText = '';
				this.userValid = !this.userValid; // forces template refresh
				this.userValid = false;
				this.#shouldValidate = false;
			} else {
				this.setValidity({ customError: false }, '', this.control);
				this.successText = this.#prevSuccessText;
				this.userValid = true;
				this.#shouldValidate = true;
				this._validate();
			}
		}
	}

	return Decorated;
}
