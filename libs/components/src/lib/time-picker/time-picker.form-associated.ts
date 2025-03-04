import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _TimePicker extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TimePicker extends FormAssociated {}

export class FormAssociatedTimePicker extends FormAssociated(_TimePicker) {
	proxy = document.createElement('input');
}
