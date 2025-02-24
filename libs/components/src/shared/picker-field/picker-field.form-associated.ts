import { FormAssociated } from '../foundation/form-associated/form-associated';
import { VividElement } from '../foundation/vivid-element/vivid-element';

class _PickerField extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _PickerField extends FormAssociated {}

export class FormAssociatedPickerField extends FormAssociated(_PickerField) {
	proxy = document.createElement('input');
}
