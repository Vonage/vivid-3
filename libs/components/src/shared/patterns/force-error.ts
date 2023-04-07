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

		constructor(...args: any[]) {
			super(...args);
			this._validate = this.validate;
			this.validate = () => {
				this._validate();
				this.forceErrorChanged('', this.forceError);
			};
		}

		forceErrorChanged(_: string, newmsg: string | undefined) {
			if (newmsg) {
				this.setValidity({ customError: true }, newmsg);
				this.userValid = false;
			} else {
				this.setValidity({ customError: false }, '');
				this.userValid = true;
			}
		}
	}

	return Decorated;
}
