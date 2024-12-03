import { FoundationElement } from '@microsoft/fast-foundation';
import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _Switch extends FoundationElement {}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
interface _Switch extends CheckableFormAssociated {}

export class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
	proxy = document.createElement('input');
}
