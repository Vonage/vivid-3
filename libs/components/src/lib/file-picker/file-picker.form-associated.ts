import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _FilePicker extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _FilePicker extends FormAssociated {}

export class FormAssociatedFilePicker extends FormAssociated(_FilePicker) {
	proxy: HTMLInputElement = document.createElement('input');
}
