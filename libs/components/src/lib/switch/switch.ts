import { attr, observable } from '@microsoft/fast-element';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import type { Connotation } from '../enums';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
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
 * @vueModel modelValue checked change `(event.currentTarget as HTMLInputElement).checked`
 */
export class Switch extends DelegatesAria(FormAssociatedSwitch) {
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
	/**
	 * @internal
	 */
	readOnlyChanged(): void {
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
	 * @internal
	 */
	@observable defaultSlottedNodes!: Node[];

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

		this.defaultChecked = !!this.checkedAttribute;
		this.checked = this.defaultChecked;
	}

	private updateForm(): void {
		const value = this.checked ? this.value : null;
		this.setFormValue(value, value);
	}

	/**
	 * @internal
	 */
	keypressHandler = (e: KeyboardEvent) => {
		if (e.key === keySpace || e.key === keyEnter) {
			this.checked = !this.checked;
		}
	};

	/**
	 * @internal
	 */
	clickHandler = () => {
		if (!this.disabled && !this.readOnly) {
			this.checked = !this.checked;
		}
	};
}
