import { FoundationElement } from '@microsoft/fast-foundation';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _NumberField extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _NumberField extends FormAssociated {}

export class FormAssociatedNumberField extends FormAssociated(_NumberField) {
	proxy = document.createElement('input');
}
