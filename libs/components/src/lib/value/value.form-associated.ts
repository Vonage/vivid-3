import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _Value extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Value extends FormAssociated {}

export class FormAssociatedValue extends FormAssociated(_Value) {
	proxy: HTMLInputElement = document.createElement('input');
}
