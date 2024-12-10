import { FormAssociated } from '../foundation/form-associated/form-associated';
import { VividElement } from '../foundation/vivid-element/vivid-element';

class _DatePickerBase extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _DatePickerBase extends FormAssociated {}

export class FormAssociatedDatePickerBase extends FormAssociated(
	_DatePickerBase
) {
	proxy = document.createElement('input');
}
