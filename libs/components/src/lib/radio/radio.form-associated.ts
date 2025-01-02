import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _Radio extends VividElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Radio extends CheckableFormAssociated {}

export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
	proxy = document.createElement('input');

	get #radioSiblings(): _Radio[] {
		const siblings = this.parentElement?.querySelectorAll(
			`${this.tagName.toLocaleLowerCase()}[name="${this.name}"]`
		);
		if (siblings) {
			return Array.from(siblings) as unknown as _Radio[];
		}
		return []; 
	}

	#validateValueMissingWithSiblings = (): void => {
		const siblings = this.#radioSiblings;
		if (siblings && siblings.length > 1) {
			const isSiblingChecked = siblings.some((x: _Radio) => x.checked);
			if (isSiblingChecked) {
				this.setValidity({ valueMissing: false });
			}
		}
	};

	#syncSiblingsRequiredValidationStatus = (force = false): void => {
		if (this.elementInternals && (!this.validity.valueMissing || force)) {
			const siblings = this.#radioSiblings;
			if (siblings && siblings.length > 1) {
				siblings.forEach((x: _Radio) => {
					x.elementInternals!.setValidity({ valueMissing: false });
				});
			}
		}
	};

	override validate = (anchor?: HTMLElement): void => {		
		super.validate(anchor);
		if (this.validity.valueMissing) {
			this.#validateValueMissingWithSiblings();
		} else {
			this.#syncSiblingsRequiredValidationStatus(true);
		} 
	}
}
