import { FormAssociated } from "@microsoft/fast-foundation";
import { Listbox } from "../listbox/listbox.js";

class _Combobox extends Listbox {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Combobox extends FormAssociated {}

/**
 * A form-associated base class for the {@link (Combobox:class)} component.
 *
 * @internal
 */
export class FormAssociatedCombobox extends FormAssociated(_Combobox) {
    proxy = document.createElement("input");
}