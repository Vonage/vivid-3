import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _NumberField extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _NumberField extends FormAssociated {}

export class FormAssociatedNumberField extends FormAssociated(_NumberField) {
	proxy = document.createElement('input');
}
