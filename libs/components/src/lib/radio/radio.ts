import {
	attr,
	DOM,
	observable,
	type SyntheticViewTemplate,
} from '@microsoft/fast-element';
import { keySpace } from '@microsoft/fast-web-utilities';
import type { VividComponentDefinition } from '../../shared/design-system/defineVividComponent.js';
import type { Connotation } from '../enums.js';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { FormElement, WithErrorText } from '../../shared/patterns';
import { CheckableFormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { RadioGroup } from '../radio-group/radio-group.js';

/**
 * Types of Checkbox connotation.
 *
 * @public
 */
export type RadioConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * A structure representing a Radio element
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
export type RadioOptions = VividComponentDefinition & {
	checkedIndicator?: string | SyntheticViewTemplate;
};

/**
 * @public
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value changes
 * @component radio
 */
export class Radio extends WithErrorText(
	FormElement(CheckableFormAssociated(VividElement))
) {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;

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

		// Since defaultCheckedChanged has been overridden, we need to initialize checked ourselves:
		this.checked = this.defaultChecked;
		this.dirtyChecked = false;
	}

	/**
	 * @internal
	 */
	override nameChanged(previous: string, next: string): void {
		super.nameChanged(previous, next);

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

		if (this.defaultChecked) {
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

	/**
	 * @internal
	 */
	override proxy = document.createElement('input');

	get #radioSiblings(): Radio[] {
		const siblings = this.parentElement?.querySelectorAll(
			`${this.tagName.toLocaleLowerCase()}[name="${this.name}"]`
		);
		if (siblings) {
			return Array.from(siblings) as unknown as Radio[];
		}
		return [];
	}

	get #radioGroup(): RadioGroup | null {
		const parentGroup = this.closest(
			`${this.tagName.toLocaleLowerCase()}-group[name="${this.name}"]`
		) as RadioGroup;

		if (parentGroup) {
			return parentGroup;
		}

		return null;
	}

	#validateValueMissingWithSiblings = (): void => {
		const siblings = this.#radioSiblings;
		const group = this.#radioGroup;

		if (siblings && siblings.length > 1) {
			const isSiblingChecked = siblings.some((x: Radio) => x.checked);
			if (isSiblingChecked) {
				this.setValidity({ valueMissing: false });
				this.errorValidationMessage = '';
				if (group) group.errorValidationMessage = '';
			}
		}
	};

	#syncSiblingsRequiredValidationStatus = (): void => {
		if (this.elementInternals && !this.validity.valueMissing) {
			const siblings = this.#radioSiblings;
			const group = this.#radioGroup;

			if (siblings && siblings.length > 1) {
				siblings.forEach((x: Radio) => {
					x.elementInternals!.setValidity({ valueMissing: false });
					x.errorValidationMessage = '';
					if (group) group.errorValidationMessage = '';
				});
			}
		}
	};

	override validate(anchor?: HTMLElement): void {
		super.validate(anchor);

		if (this.proxy) {
			this.errorValidationMessage = this.validationMessage || '';

			if (this.validity.valueMissing) {
				this.#validateValueMissingWithSiblings();
			} else {
				this.#syncSiblingsRequiredValidationStatus();
			}
		}
	}
}
