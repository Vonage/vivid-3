import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _TimePicker extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TimePicker extends FormAssociated {}

export class FormAssociatedTimePicker extends FormAssociated(_TimePicker) {
	proxy = document.createElement('input');
}
