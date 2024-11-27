import {
	CheckableFormAssociated,
	FoundationElement,
} from '@microsoft/fast-foundation';

class _Switch extends FoundationElement {}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
interface _Switch extends CheckableFormAssociated {}

export class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
	proxy = document.createElement('input');
}
