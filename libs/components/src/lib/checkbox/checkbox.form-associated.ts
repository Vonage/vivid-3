import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _Checkbox extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Checkbox extends CheckableFormAssociated {}

export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
	proxy = document.createElement('input');
}
