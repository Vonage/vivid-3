import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _RangeSlider extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _RangeSlider extends FormAssociated {}

export class FormAssociatedRangeSlider extends FormAssociated(_RangeSlider) {
	proxy = document.createElement('input');
}
