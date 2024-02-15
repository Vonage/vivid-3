import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _RangeSlider extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _RangeSlider extends FormAssociated {}

export class FormAssociatedRangeSlider extends FormAssociated(_RangeSlider) {
	proxy = document.createElement('input');
}
