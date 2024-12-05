import { FoundationElement } from '@microsoft/fast-foundation';
import { FormAssociated } from '../foundation/form-associated/form-associated';

class _DatePickerBase extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _DatePickerBase extends FormAssociated {}

export class FormAssociatedDatePickerBase extends FormAssociated(
	_DatePickerBase
) {
	proxy = document.createElement('input');
}
