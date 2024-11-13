import { FormAssociated, FoundationElement, } from '@microsoft/fast-foundation';

class _Switch extends FoundationElement {}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
interface _Switch extends FormAssociated {}

export class FormAssociatedSwitch extends FormAssociated(_Switch) {
	proxy = document.createElement('input');
}
