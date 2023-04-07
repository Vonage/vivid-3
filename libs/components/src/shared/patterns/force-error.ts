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
		#bypassValidation = false;

		constructor(...args: any[]) {
			super(...args);
			this._validate = this.validate;
			this.validate = () => {
				if (this.#bypassValidation) return;
				this._validate();
			};
		}

		forceErrorChanged(_: string, newmsg: string) {
			if (newmsg) {
				this.setValidity({ customError: true }, newmsg);
				this.userValid = false;
				this.#bypassValidation = true;
			} else {
				this.setValidity({ customError: false }, '');
				this.userValid = true;
				this.#bypassValidation = false;
			}
		}
	}

	return Decorated;
}
