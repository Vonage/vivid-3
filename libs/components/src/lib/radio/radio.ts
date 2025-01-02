import {
	attr,
	DOM,
	observable,
	type SyntheticViewTemplate,
} from '@microsoft/fast-element';
import { type FoundationElementDefinition } from '@microsoft/fast-foundation';
import { keySpace } from '@microsoft/fast-web-utilities';
import type { Connotation } from '../enums.js';
import { FormAssociatedRadio } from './radio.form-associated';

/**
 * Types of Checkbox connotation.
 *
 * @public
 */
export type RadioConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * A structure representing a {@link @microsoft/fast-foundation#(Radio:class)} element
 * @public
 */
export type RadioControl = Pick<
	HTMLInputElement,
	| 'checked'
	| 'disabled'
	| 'readOnly'
	| 'focus'
	| 'setAttribute'
	| 'getAttribute'
>;

/**
 * Radio configuration options
 * @public
 */
export type RadioOptions = FoundationElementDefinition & {
	checkedIndicator?: string | SyntheticViewTemplate;
};

/**
 * @public
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value changes
 * @component radio
 */
export class Radio extends FormAssociatedRadio {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;

	/**
	 * Indicates the radio's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * The connotation the radioButton should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: RadioConnotation;

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
	 * The name of the radio. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname | name attribute} for more info.
	 */
	@attr
	override name!: string;

	/**
	 * The element's value to be included in form submission when checked.
	 * Default to "on" to reach parity with input[type="radio"]
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
	 * @internal
	 */
	override defaultCheckedChanged() {
		if (this.$fastController.isConnected && !this.dirtyChecked) {
			// Setting this.checked will cause us to enter a dirty state,
			// but if we are clean when defaultChecked is changed, we want to stay
			// in a clean state, so reset this.dirtyChecked
			if (!this.isInsideRadioGroup()) {
				this.checked = this.defaultChecked;
				this.dirtyChecked = false;
			}
		}
	}

	constructor() {
		super();
		this.proxy.setAttribute('type', 'radio');
		this.proxy.setAttribute('name', this.name);
	}

	/**
	 * @internal
	 */
	override nameChanged(previous: string, next: string): void {
		if (super.nameChanged) {
			super.nameChanged(previous, next);
		}
		next !== null
			? this.proxy.setAttribute('name', this.name)
			: this.proxy.removeAttribute('name');

		DOM.queueUpdate(this.validate);
	}
	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();
		DOM.queueUpdate(this.validate);

		if (
			this.parentElement!.getAttribute('role') !== 'radiogroup' &&
			this.getAttribute('tabindex') === null
		) {
			if (!this.disabled) {
				this.setAttribute('tabindex', '0');
			}
		}

		if (this.checkedAttribute) {
			if (!this.dirtyChecked) {
				// Setting this.checked will cause us to enter a dirty state,
				// but if we are clean when defaultChecked is changed, we want to stay
				// in a clean state, so reset this.dirtyChecked
				if (!this.isInsideRadioGroup()) {
					this.checked = this.defaultChecked;
					this.dirtyChecked = false;
				}
			}
		}
	}

	private isInsideRadioGroup(): boolean {
		const parent: HTMLElement | null = (this as HTMLElement).closest(
			'[role=radiogroup]'
		);
		return parent !== null;
	}

	/**
	 * @internal
	 */
	keypressHandler = (e: KeyboardEvent): boolean | void => {
		switch (e.key) {
			case keySpace:
				if (!this.checked && !this.readOnly) {
					this.checked = true;
				}
				return;
		}

		return true;
	};

	/**
	 * @internal
	 */
	clickHandler(_: MouseEvent): boolean | void {
		if (!this.disabled && !this.readOnly && !this.checked) {
			this.checked = true;
		}
	}
}
