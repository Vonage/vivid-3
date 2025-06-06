import { attr, observable } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';
import {
	FormElement,
	WithErrorText,
	WithSuccessText,
} from '../../shared/patterns';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { WithFeedback } from '../../shared/feedback/mixins';
import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

export const keySpace: ' ' = ' ' as const;

/**
 * Types of Checkbox connotation.
 *
 * @public
 */
export type CheckboxConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * @public
 * @component checkbox
 * @slot - The default slot allows you to use rich content as the checkbox's label.
 * @slot helper-text - Describes how to use the checkbox. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Emitted when the checked state changes.
 * @event {CustomEvent<undefined>} input - Emitted when the checked state changes.
 * @vueModel modelValue checked change `event.currentTarget.checked`
 */
export class Checkbox extends DelegatesAria(
	WithFeedback(
		WithErrorText(
			WithSuccessText(FormElement(CheckableFormAssociated(VividElement)))
		)
	)
) {
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
	 * @internal
	 */
	override proxy = document.createElement('input');

	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly!: boolean; // Map to proxy element
	/**
	 * @internal
	 */
	readOnlyChanged() {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.readOnly = this.readOnly;
		}
	}

	/**
	 * The element's value to be included in form submission when checked.
	 * Default to "on" to reach parity with input[type="checkbox"]
	 *
	 * @internal
	 */
	override initialValue = 'on';

	/**
	 * @internal
	 */
	@observable
	defaultSlottedNodes: Node[] = [];

	/**
	 * The indeterminate state of the control.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: indeterminate
	 */
	@attr({ attribute: 'indeterminate', mode: 'boolean' })
	indeterminate = false;

	constructor() {
		super();

		this.proxy.setAttribute('type', 'checkbox');
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
	 * @internal
	 */
	keypressHandler = (event: KeyboardEvent): boolean => {
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
	 * @internal
	 */
	clickHandler = (event: Event): boolean => {
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
