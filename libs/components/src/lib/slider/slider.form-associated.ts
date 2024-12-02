import { FoundationElement } from '@microsoft/fast-foundation';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';

class _Slider extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Slider extends FormAssociated {}

export class FormAssociatedSlider extends FormAssociated(_Slider) {
	proxy = document.createElement('input');
}
