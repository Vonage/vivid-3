import { FoundationElement } from '@microsoft/fast-foundation';
import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _Checkbox extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Checkbox extends CheckableFormAssociated {}

export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
	proxy = document.createElement('input');
}
