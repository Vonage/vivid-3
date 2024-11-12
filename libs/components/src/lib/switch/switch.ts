import { attr, observable } from '@microsoft/fast-element';
import { keySpace } from '@microsoft/fast-web-utilities';
import type { Connotation } from '../enums';
import { FormAssociatedSwitch } from './switch.form-associated';

export type SwitchConnotation =
	| Connotation.Accent
	| Connotation.Alert
	| Connotation.Announcement
	| Connotation.Success
	| Connotation.CTA;
/**
 * @public
 * @component switch
 * @event {CustomEvent<undefined>} change - Emits a custom change event when the checked state changes
 * @vueModel modelValue checked change `(event.target as HTMLInputElement).checked`
 */
export class Switch extends FormAssociatedSwitch {
	/**
	 * Indicates the switch's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates the switch's connotation.
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SwitchConnotation;

	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	// @ts-expect-error Type is incorrectly non-optional
	@attr({ attribute: 'readonly', mode: 'boolean' }) readOnly: boolean; // Map to proxy element
	// @ts-expect-error Function is declared but never read
	private readOnlyChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.readOnly = this.readOnly;
		}

		this.readOnly
			? this.classList.add('readonly')
			: this.classList.remove('readonly');
	}

	/**
	 * The element's value to be included in form submission when checked.
	 * Default to "on" to reach parity with input[type="checkbox"]
	 *
	 * @internal
	 */
	override initialValue = 'on';

	/**
	 * The checked attribute value. This sets the initial checked value.
	 *
	 * @public
	 * HTML Attribute: checked
	 */
	// @ts-expect-error Type is incorrectly non-optional
	@attr({ attribute: 'checked', mode: 'boolean' }) checkedAttribute: boolean;
	// @ts-expect-error Function is declared but never read
	private checkedAttributeChanged(): void {
		this.defaultChecked = this.checkedAttribute;
	}

	/**
	 * @internal
	 */
	// @ts-expect-error Type is incorrectly non-optional
	@observable defaultSlottedNodes: Node[];

	/**
	 * Initialized to the value of the checked attribute. Can be changed independently of the "checked" attribute,
	 * but changing the "checked" attribute always additionally sets this value.
	 *
	 * @public
	 */
	@observable defaultChecked: boolean;
	// @ts-expect-error Function is declared but never read
	private defaultCheckedChanged(): void {
		if (!this.dirtyChecked) {
			// Setting this.checked will cause us to enter a dirty state,
			// but if we are clean when defaultChecked is changed, we want to stay
			// in a clean state, so reset this.dirtyChecked
			this.checked = this.defaultChecked;
			this.dirtyChecked = false;
		}
	}

	/**
	 * The checked state of the control.
	 *
	 * @public
	 */
	@observable checked: boolean;
	// @ts-expect-error Function is declared but never read
	private checkedChanged(): void {
		if (!this.dirtyChecked) {
			this.dirtyChecked = true;
		}

		this.updateForm();

		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.checked = this.checked;
		}

		this.$emit('change');

		this.checked
			? this.classList.add('checked')
			: this.classList.remove('checked');

		this.validate();
	}

	/**
	 * Tracks whether the "checked" property has been changed.
	 * This is necessary to provide consistent behavior with
	 * normal input checkboxes
	 */
	private dirtyChecked = false;

	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();

		this.proxy.setAttribute('type', 'checkbox');

		this.updateForm();
	}

	constructor() {
		super();

		// @ts-expect-error Property used before it's defined
		this.defaultChecked = !!this.checkedAttribute;
		this.checked = this.defaultChecked;
	}

	/**
	 * @internal
	 */
	override formResetCallback = (): void => {
		this.checked = this.checkedAttribute;
		this.dirtyChecked = false;
	};

	private updateForm(): void {
		const value = this.checked ? this.value : null;
		this.setFormValue(value, value);
	}

	/**
	 * @internal
	 */
	keypressHandler = (e: KeyboardEvent) => {
		switch (e.key) {
			case keySpace:
				this.checked = !this.checked;
				break;
		}
	};

	/**
	 * @internal
	 */
	clickHandler = (e: MouseEvent) => {
		console.log(e);
		if (!this.disabled && !this.readOnly) {
			this.checked = !this.checked;
		}
	};
}
