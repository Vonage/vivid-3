import { attr, observable } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../../utils/mixins';
import type { FormAssociatedElement } from '../../foundation/form-associated/form-associated';

/**
 * Determines when to show the error message for form associated elements.
 */
export const FormElement = <T extends Constructor<FormAssociatedElement>>(
	Base: T
) => {
	/**
	 * @testSelector byLabel byLabel
	 * @testQuery visibleError visibleError
	 */
	class FormElementElement extends Base {
		/**
		 * The label for the form element.
		 */
		@attr label?: string;

		/**
		 * Will hold the error message that should currently be visible in the UI.
		 * Note: Cannot be a getter because this.validationMessage is not observable
		 * @internal
		 */
		@observable errorValidationMessage = '';

		/**
		 * @internal
		 */
		forceErrorDisplay = false;
		/**
		 * @internal
		 */
		hasBeenTouched = false;

		constructor(...args: any[]) {
			super(...args);
			this.addEventListener('blur', () => {
				this.hasBeenTouched = true;
				this.forceErrorDisplay = false;
				this.validate();
			});
			this.addEventListener('focus', () => {
				this.hasBeenTouched = false;
			});
			this.addEventListener('invalid', () => {
				this.proxy.dispatchEvent(new Event('invalid'));
			});
		}

		/**
		 * @internal
		 */
		override connectedCallback() {
			super.connectedCallback();
			this.proxy.addEventListener('invalid', this.#handleInvalidEvent);
		}

		#handleInvalidEvent = () => {
			this.forceErrorDisplay = true;
			this.validate();
		};

		/**
		 * @internal
		 */
		override disconnectedCallback() {
			super.disconnectedCallback();
			this.proxy.removeEventListener('invalid', this.#handleInvalidEvent);
		}

		/**
		 * @internal
		 */
		override formResetCallback() {
			this.forceErrorDisplay = false;

			super.formResetCallback();

			// super.formResetCallback will reset the value, which triggers validate(), and only afterward clear dirtyValue
			// Therefore, we need to validate again now that dirtyValue has changed
			this.validate();
		}

		/**
		 * @internal
		 */
		override validate() {
			super.validate();

			const shouldShowValidationError =
				this.forceErrorDisplay || (this.hasBeenTouched && this.dirtyValue);

			this.errorValidationMessage = shouldShowValidationError
				? this.validationMessage
				: '';
		}
	}

	return FormElementElement;
};

export type FormElementElement = MixinType<typeof FormElement>;
