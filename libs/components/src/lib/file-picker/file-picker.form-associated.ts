import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _FilePicker extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _FilePicker extends FormAssociated {}

export class FormAssociatedFilePicker extends FormAssociated(_FilePicker) {
	proxy: HTMLInputElement = document.createElement('input');
}
