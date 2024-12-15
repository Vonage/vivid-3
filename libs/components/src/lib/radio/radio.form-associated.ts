import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _Radio extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Radio extends CheckableFormAssociated {}

export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
	proxy = document.createElement('input');
}
