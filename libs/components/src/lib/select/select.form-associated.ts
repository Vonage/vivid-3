import { FormAssociated } from '@microsoft/fast-foundation';
import { Listbox } from '../../shared/foundation/listbox/listbox';

class _Select extends Listbox {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Select extends FormAssociated {}

export class FormAssociatedSelect extends FormAssociated(_Select) {
	proxy = document.createElement('select');
}
