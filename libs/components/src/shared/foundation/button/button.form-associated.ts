import { FormAssociated } from '../form-associated/form-associated';
import { VividElement } from '../vivid-element/vivid-element';

class _FoundationButton extends VividElement {}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
interface _FoundationButton extends FormAssociated {}

/**
 * A form-associated base class for the Button component.
 *
 * @internal
 */
export class FormAssociatedButton extends FormAssociated(_FoundationButton) {
	proxy = document.createElement('input');
}
