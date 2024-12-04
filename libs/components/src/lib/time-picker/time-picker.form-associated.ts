import { FoundationElement } from '@microsoft/fast-foundation';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _TimePicker extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TimePicker extends FormAssociated {}

export class FormAssociatedTimePicker extends FormAssociated(_TimePicker) {
	proxy = document.createElement('input');
}
