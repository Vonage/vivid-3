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
	@observable _valid = true;

	@volatile
	get errorValidationMessage() {
		return this._valid ? '' : this.validationMessage;
	}

	override validate() {
		super.validate();
		if (this.proxy instanceof HTMLElement) {
			this._valid = this.dirtyValue ? !Boolean(this.validationMessage) : true;
		}
	}
}
