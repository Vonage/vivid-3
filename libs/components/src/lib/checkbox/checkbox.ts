import { Checkbox as FoundationCheckbox } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';
import {
	errorText,
	type ErrorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';

export const keySpace: ' ' = ' ' as const;

/**
 * Types of Checkbox connotation.
 *
 * @public
 */
export type CheckboxConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

export type AriaCheckedStates = 'false' | 'true' | 'mixed' | 'undefined';

/**
 * @public
 * @component checkbox
 * @slot helper-text - Describes how to use the checkbox. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Emitted when the checked state changes.
 * @event {CustomEvent<undefined>} input - Emitted when the checked state changes.
 * @vueModel modelValue checked change `(event.target as HTMLInputElement).checked`
 */
@errorText
@formElements
export class Checkbox extends FoundationCheckbox {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
	@attr({ attribute: 'tabindex' }) tabindex: string | null = null;

	/**
	 * The connotation the checklist should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: CheckboxConnotation;

	/**
	 * The current checkbox state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: aria-checked
	 */
	@attr({ attribute: 'aria-checked' })
	override ariaChecked: AriaCheckedStates | null = null;

	indeterminateChanged(_: boolean, next: boolean) {
		this.checked = !next;
	}

	ariaCheckedChanged() {
		if (this.ariaChecked === 'mixed') {
			this.indeterminate = true;
		} else {
			this.indeterminate = false;
			this.checked = this.ariaChecked === 'true' ? true : false;
		}
	}
	/**
	 * @internal
	 */
	override checkedChanged(prev: boolean | undefined, next: boolean): void {
		super.checkedChanged(prev, next);

		this.ariaChecked = next == true ? 'true' : 'false';
		if (prev !== undefined) {
			this.$emit('input');
		}
	}

	/**
	 * !remove method as will be implemented by fast-foundation in version after 2.46.9
	 *
	 * @internal
	 */
	override keypressHandler = (event: KeyboardEvent): boolean => {
		if (event.target instanceof HTMLAnchorElement) {
			return true;
		}

		if (!this.disabled && !this.readOnly) {
			switch (event.key) {
				case keySpace:
					if (this.indeterminate) {
						this.indeterminate = false;
					}
					this.checked = !this.checked;
					break;
			}
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

export interface Checkbox
	extends FormElement,
		FormElementHelperText,
		ErrorText,
		FormElementSuccessText {}
applyMixinsWithObservables(
	Checkbox,
	FormElementHelperText,
	FormElementSuccessText
);
