import { PickerField } from '../picker-field';
import type { AbstractConstructor, MixinType } from '../../utils/mixins';

/**
 * Mixin for pickers that pick a single value (this.value), which can be i.e. a date, time or datetime.
 * Subclasses need to implement the abstract methods for their specific value format.
 */
export const SingleValuePicker = <T extends AbstractConstructor<PickerField>>(
	Base: T
) => {
	abstract class SingleValuePickerElement extends Base {
		/**
		 * @internal
		 */
		abstract _isValidValue(value: string): boolean;

		/**
		 * Converts from the value format to the presentation value that will be
		 * displayed in the text field.
		 * @internal
		 */
		abstract _toPresentationValue(value: string): string;

		/**
		 * Parses the value a user entered into the text field into the value format
		 * or throws if the input cannot be parsed.
		 * @internal
		 */
		abstract _parsePresentationValue(presentationValue: string): string;

		/**
		 * @internal
		 */
		_isInternalValueUpdate = false;

		/**
		 * @internal
		 */
		override valueChanged(previous: string, next: string) {
			super.valueChanged(previous, next);
			if (this.value) {
				if (!this._isValidValue(this.value)) {
					this.value = '';
					return;
				}
			}
			// prevent updating the presentation value on 'input'
			if (!this._isInternalValueUpdate) {
				this._updatePresentationValue();
			}
		}

		/**
		 * @internal
		 */
		override _updatePresentationValue() {
			if (this.value) {
				this._presentationValue = this._toPresentationValue(this.value);
			} else {
				this._presentationValue = '';
			}
		}

		/**
		 * @internal
		 */
		_updateValueDueToUserInteraction(newValue: string) {
			this.value = newValue;
			this.$emit('change');
			this.$emit('input');
		}

		/**
		 * @internal
		 */
		override _onTextFieldChange() {
			if (this._presentationValue === '') {
				this.value = '';
				this.$emit('change');
				return;
			}

			try {
				this.value = this._parsePresentationValue(this._presentationValue);
				this.$emit('change');
			} catch (_) {
				const invalidPresentationValue = this._presentationValue;
				this.value = '';
				this.$emit('change');
				this._presentationValue = invalidPresentationValue;
				return;
			}
		}

		/**
		 * @internal
		 */
		override _onTextFieldInput(event: Event): void {
			super._onTextFieldInput(event);
			this._isInternalValueUpdate = true;

			if (this._presentationValue === '') {
				this.value = '';
				this.$emit('input');
				return;
			}

			try {
				const parsedValue = this._parsePresentationValue(
					this._presentationValue
				);
				if (this.value !== parsedValue) {
					this.value = parsedValue;
					this.$emit('input');
				}
			} catch (_) {
				// Invalid intermediate value, do nothing until change event
				return;
			}

			this._isInternalValueUpdate = false;
		}

		/**
		 * @internal
		 */
		_isPresentationValueInvalid() {
			if (this._presentationValue === '') {
				return false;
			}

			try {
				this._parsePresentationValue(this._presentationValue);
				return false;
			} catch (_) {
				return true;
			}
		}

		/**
		 * @internal
		 */
		override _onClearClick() {
			this._updateValueDueToUserInteraction('');
			super._onClearClick();
		}
	}

	return SingleValuePickerElement;
};

export type SingleValuePickerElement = MixinType<typeof SingleValuePicker>;
