import { applyMixins, Checkbox as FoundationCheckbox } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';
import {
	errorText,
	type ErrorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	FormElementSuccessText
} from '../../shared/patterns';


export const keySpace: ' ' = ' ' as const;

/**
 * Types of Checkbox connotation.
 *
 * @public
 */
export type CheckboxConnotation = Extract<Connotation, | Connotation.Accent | Connotation.CTA>;


/**
 * Base class for checkbox
 *
 * @public
 */
@errorText
@formElements
export class Checkbox extends FoundationCheckbox {
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;
	@attr({attribute: 'aria-labelledby'}) ariaLabelledby: string | null = null;
	@attr({attribute: 'aria-describedby'}) ariaDescribedby: string | null = null;
	/**
	 * The connotation the checklist should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: CheckboxConnotation;

	/**
	 * !remove method as will be implemented by fast-foundation in version after 2.46.9
	 *
	 * @internal
	 */
	override keypressHandler = (event: KeyboardEvent): boolean => {
		if (event.target instanceof HTMLAnchorElement) {
			return true;
		}

		switch (event.key) {
			case keySpace:
				if (this.indeterminate) {
					this.indeterminate = false;
				}
				this.checked = !this.checked;
				break;
		}
		return false;
	};

	/**
	 * !remove method as will be implemented by fast-foundation in version after 2.46.9
	 *
	 * @internal
	 */
	override clickHandler = (event: Event): boolean => {
		if (event.target instanceof HTMLAnchorElement) {
			return true;
		}

		if (!this.disabled && !this.readOnly) {
			if (this.indeterminate) {
				this.indeterminate = false;
			}
			this.checked = !this.checked;
		}

		return false;
	};

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable slottedContent?: HTMLElement[];
}

export interface Checkbox extends FormElement, FormElementHelperText, ErrorText, FormElementSuccessText { }
applyMixins(Checkbox, FormElementHelperText, FormElementSuccessText);
