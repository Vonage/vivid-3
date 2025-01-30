import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { Listbox } from '../../shared/foundation/listbox/listbox';

class _Select extends Listbox {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Select extends FormAssociated {}

export class FormAssociatedSelect extends FormAssociated(_Select) {
	proxy = document.createElement('select');
}
