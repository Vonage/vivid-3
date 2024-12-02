import { FoundationElement } from '@microsoft/fast-foundation';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _SearchableSelect extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _SearchableSelect extends FormAssociated {}

export class FormAssociatedSearchableSelect extends FormAssociated(
	_SearchableSelect
) {
	proxy = document.createElement('input');
}
