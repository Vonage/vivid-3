import { FoundationElement } from '@microsoft/fast-foundation';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _TextField extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TextField extends FormAssociated {}

export class FormAssociatedTextField extends FormAssociated(_TextField) {
	proxy = document.createElement('input');
}
