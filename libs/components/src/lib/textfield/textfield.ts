import { TextField as FoundationTextfield } from '@microsoft/fast-foundation';
import {attr, observable, volatile} from '@microsoft/fast-element';

/**
 * Base class for textfield
 *
 * @public
 */
export class Textfield extends FoundationTextfield {
	@attr label?: string;
	@attr({attribute: 'helper-text'}) helperText?: string;
	@attr({attribute: 'char-count', mode: 'boolean'}) charCount = false;
	@observable isValid = true;

	@volatile
	get errorValidationMessage() {
		return this.isValid ? '' : this.validationMessage;
	}

	override validate() {
		super.validate();
		if (this.proxy instanceof HTMLElement) {
			this.isValid = this.dirtyValue ? !Boolean(this.validationMessage) : true;
		}
	}
}
