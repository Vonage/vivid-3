import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _SearchableSelect extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _SearchableSelect extends FormAssociated {}

export class FormAssociatedSearchableSelect extends FormAssociated(
	_SearchableSelect
) {
	proxy = document.createElement('input');
}
