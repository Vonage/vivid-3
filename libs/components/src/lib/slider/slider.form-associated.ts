import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _Slider extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Slider extends FormAssociated {}

export class FormAssociatedSlider extends FormAssociated(_Slider) {
	proxy = document.createElement('input');
}
