import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _DatePicker extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _DatePicker extends FormAssociated {}

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(TextField:class)} component.
 *
 * @beta
 */
export class FormAssociatedDatePicker extends FormAssociated(_DatePicker) {
	proxy: HTMLInputElement;

	constructor() {
		super();
		this.proxy = document.createElement('input');
		this.proxy.type = 'date';
	}
}
