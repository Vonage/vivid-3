import {applyMixins, Checkbox as FoundationCheckbox} from '@microsoft/fast-foundation';
import {
	FormElement,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import {ErrorText, errorText} from '../../shared/patterns';

export const keySpace: ' ' = ' ' as const;

/**
 * Base class for checkbox
 *
 * @public
 */
@errorText
@formElements
export class Checkbox extends FoundationCheckbox {
	/**
	 * Indicates the checkbox's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */


	/**
	 * !remove method as will be implemented by fast-foundation in version > 2.46.9
	 *
	 * @param e
	 * @internal
	 */
	override keypressHandler = (e: KeyboardEvent): void => {
		switch (e.key) {
			case keySpace:
				if (this.indeterminate) {
					this.indeterminate = false;
				}
				this.checked = !this.checked;
				break;
		}
	};

	/**
	 * !remove method as will be implemented by fast-foundation in version > 2.46.9
	 *
	 * @param e
	 * @internal
	 */
	override clickHandler = (): void => {
		if (!this.disabled && !this.readOnly) {
			if (this.indeterminate) {
				this.indeterminate = false;
			}
			this.checked = !this.checked;
		}
	};
}

export interface Checkbox extends FormElement, FormElementHelperText, ErrorText, FormElementSuccessText{}
applyMixins(Checkbox, FormElementHelperText, FormElementSuccessText);
