import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _SearchableSelect extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _SearchableSelect extends FormAssociated {}

export class FormAssociatedSearchableSelect extends FormAssociated(
	_SearchableSelect
) {
	proxy = document.createElement('input');
}
