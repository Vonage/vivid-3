import { FormAssociated } from '@microsoft/fast-foundation';
import { ListboxElement } from '../../shared/foundation/listbox/listbox.element';

class _Select extends ListboxElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Select extends FormAssociated {}

export class FormAssociatedSelect extends FormAssociated(_Select) {
	proxy = document.createElement('select');
}
