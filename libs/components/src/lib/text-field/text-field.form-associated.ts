import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _TextField extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TextField extends FormAssociated {}

export class FormAssociatedTextField extends FormAssociated(_TextField) {
	proxy = document.createElement('input');
}
