import { attr } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../../utils/mixins';
import type { FormElementElement } from './form-element';

/**
 * Mixin for elements that can display error text.
 */
export const WithErrorText = <T extends Constructor<FormElementElement>>(
	Base: T
) => {
	class ElementWithErrorText extends Base {
		/**
		 * Provides a custom error message. Any current error state will be overridden.
		 * @public
		 * @remarks
		 * HTML Attribute: error-text
		 */
		@attr({ attribute: 'error-text' }) errorText?: string;

		/**
		 * @internal
		 */
		errorTextChanged(_: string, newErrorText: string | undefined) {
			if (newErrorText) {
				this.#forceCustomError(newErrorText);
			} else {
				this.#clearCustomErrorAndRevalidate();
			}
		}

		#blockValidateCalls = false;
		#originalValidateFn: () => void;

		constructor(...args: any[]) {
			super(...args);
			this.#originalValidateFn = this.validate;
			this.validate = () => {
				if (!this.#blockValidateCalls) this.#originalValidateFn();
			};
		}

		#forceCustomError(errorMessage: string) {
			this.setValidity(
				{ customError: true },
				errorMessage,
				(this as any).control
			);
			this.errorValidationMessage = errorMessage;

			this.#blockValidateCalls = true;
		}

		#clearCustomErrorAndRevalidate() {
			this.setValidity({}, '', (this as any).control);
			this.#blockValidateCalls = false;

			this.validate();
		}
	}

	return ElementWithErrorText;
};

export type ElementWithErrorText = MixinType<typeof WithErrorText>;
