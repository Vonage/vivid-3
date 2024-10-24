import {
	CheckableFormAssociated,
	FoundationElement,
} from '@microsoft/fast-foundation';

class _Checkbox extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Checkbox extends CheckableFormAssociated {}

export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
	proxy = document.createElement('input');
}
