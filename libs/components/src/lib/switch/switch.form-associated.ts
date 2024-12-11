import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _Switch extends VividElement {}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
interface _Switch extends CheckableFormAssociated {}

export class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
	proxy = document.createElement('input');
}
