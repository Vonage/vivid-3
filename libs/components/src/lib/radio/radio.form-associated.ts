import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

class _Radio extends VividElement {}
class _RadioGroup extends VividElement {}
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

	get #radioGroup(): _RadioGroup | null {
		const parentGroup = this.closest(
			`${this.tagName.toLocaleLowerCase()}-group[name="${this.name}"]`
		) as _RadioGroup;

		if (parentGroup) {
			return parentGroup;
		}

		return null;
	}

	#validateValueMissingWithSiblings = (): void => {
		const siblings = this.#radioSiblings;
		const group = this.#radioGroup;
		if (siblings && siblings.length > 1) {
			const isSiblingChecked = siblings.some((x: _Radio) => x.checked);
			if (isSiblingChecked) {
				this.setValidity({ valueMissing: false });
				// @ts-expect-error it is inherits from @formElements
				this.errorValidationMessage = '';
				// @ts-expect-error it is inherits from @formElements
				if (group) group.errorValidationMessage = '';
			}
		}
	};

	#syncSiblingsRequiredValidationStatus = (): void => {
		if (this.elementInternals && !this.validity.valueMissing) {
			const siblings = this.#radioSiblings;
			const group = this.#radioGroup;

			if (siblings && siblings.length > 1) {
				siblings.forEach((x: _Radio) => {
					x.elementInternals!.setValidity({ valueMissing: false });
					// @ts-expect-error it is inherits from @formElements
					x.errorValidationMessage = '';
					// @ts-expect-error it is inherits from @formElements
					if (group) group.errorValidationMessage = '';
				});
			}
		}
	};

	override validate = (anchor?: HTMLElement): void => {
		super.validate(anchor);

		if (this.proxy) {
			// @ts-expect-error it is inherits from @formElements
			this.errorValidationMessage = this.validationMessage || '';

			if (this.validity.valueMissing) {
				this.#validateValueMissingWithSiblings();
			} else {
				this.#syncSiblingsRequiredValidationStatus();
			}
		}
	};
}
