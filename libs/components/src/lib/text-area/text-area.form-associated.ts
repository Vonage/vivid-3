import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _TextArea extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TextArea extends FormAssociated {}

export class FormAssociatedTextArea extends FormAssociated(_TextArea) {
	proxy = document.createElement('textarea');
}
