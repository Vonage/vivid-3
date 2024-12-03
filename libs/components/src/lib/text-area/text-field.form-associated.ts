import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _TextArea extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TextArea extends FormAssociated {}

export class FormAssociatedTextArea extends FormAssociated(_TextArea) {
	proxy = document.createElement('textarea');
}
