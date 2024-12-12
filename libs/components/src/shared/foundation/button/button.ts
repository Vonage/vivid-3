/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { attr } from '@microsoft/fast-element';
import type { VividComponentDefinition } from '../../design-system/defineVividComponent';
import { ARIAGlobalStatesAndProperties } from '../patterns/index';
import { applyMixins } from '../utilities/apply-mixins';
import { FormAssociatedButton } from './button.form-associated';

/**
 * Button configuration options
 * @public
 */
export type ButtonOptions = VividComponentDefinition;

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
export class VividFoundationButton extends FormAssociatedButton {
	/**
	 * Determines if the element should receive document focus on page load.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: autofocus
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	public autofocus: boolean;

	/**
	 * The id of a form to associate the element to.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: form
	 */
	@attr({ attribute: 'form' })
	// @ts-expect-error Type is incorrectly non-optional
	public formId: string;

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: formaction
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	public formaction: string;
	// @ts-expect-error Function is delcared but not used
	private formactionChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.formAction = this.formaction;
		}
	}

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: formenctype
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	public formenctype: string;
	// @ts-expect-error Function is delcared but not used
	private formenctypeChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.formEnctype = this.formenctype;
		}
	}

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: formmethod
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	public formmethod: string;
	// @ts-expect-error Function is delcared but not used
	private formmethodChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.formMethod = this.formmethod;
		}
	}

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: formnovalidate
	 */
	@attr({ mode: 'boolean' })
	// @ts-expect-error Type is incorrectly non-optional
	public formnovalidate: boolean;
	// @ts-expect-error Function is delcared but not used
	private formnovalidateChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.formNoValidate = this.formnovalidate;
		}
	}

	/**
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: formtarget
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	public formtarget: '_self' | '_blank' | '_parent' | '_top';
	// @ts-expect-error Function is delcared but not used
	private formtargetChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.formTarget = this.formtarget;
		}
	}

	/**
	 * The button type.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: type
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	public type: 'submit' | 'reset' | 'button';
	// @ts-expect-error Function is delcared but not used
	private typeChanged(
		previous: 'submit' | 'reset' | 'button' | void,
		next: 'submit' | 'reset' | 'button'
	): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.type = this.type;
		}

		next === 'submit' && this.addEventListener('click', this.handleSubmission);
		previous === 'submit' &&
			this.removeEventListener('click', this.handleSubmission);
		next === 'reset' && this.addEventListener('click', this.handleFormReset);
		previous === 'reset' &&
			this.removeEventListener('click', this.handleFormReset);
	}

	/** {@inheritDoc (FormAssociated:interface).validate} */
	public override validate(): void {
		super.validate(this.control);
	}

	/**
	 * @internal
	 */
	public override connectedCallback(): void {
		super.connectedCallback();

		this.proxy.setAttribute('type', this.type);
		this.handleUnsupportedDelegatesFocus();

		const elements = Array.from(this.control.children) as HTMLSpanElement[];
		if (elements) {
			elements.forEach((span: HTMLSpanElement) => {
				span.addEventListener('click', this.handleClick);
			});
		}
	}

	/**
	 * @internal
	 */
	public override disconnectedCallback(): void {
		super.disconnectedCallback();

		const elements = Array.from(this.control.children) as HTMLSpanElement[];
		if (elements) {
			elements.forEach((span: HTMLSpanElement) => {
				span.removeEventListener('click', this.handleClick);
			});
		}
	}

	/**
	 * Prevent events to propagate if disabled
	 * @internal
	 */
	private handleClick = (e: Event) => {
		if (this.disabled) {
			e.stopPropagation();
		}
	};

	/**
	 * Submits the parent form
	 */
	private handleSubmission = () => {
		if (!this.form) {
			return;
		}

		this.attachProxy();

		this.form.requestSubmit(this.proxy);

		this.detachProxy();
	};

	/**
	 * Resets the parent form
	 */
	private handleFormReset = () => {
		this.form?.reset();
	};

	public control!: HTMLButtonElement;

	/**
	 * Overrides the focus call for where delegatesFocus is unsupported.
	 * This check works for Chrome, Edge Chromium, FireFox, and Safari
	 * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
	 */
	private handleUnsupportedDelegatesFocus = () => {
		// Check to see if delegatesFocus is supported
		if (this.$fastController.definition.shadowOptions) {
			if (
				window.ShadowRoot &&
				/* eslint-disable-next-line */
				!window.ShadowRoot.prototype.hasOwnProperty('delegatesFocus') &&
				this.$fastController.definition.shadowOptions.delegatesFocus
			) {
				this.focus = () => {
					this.control.focus();
				};
			}
		}
	};
}

/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export class DelegatesARIAButton {
	/**
	 * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
	 * @public
	 * @remarks
	 * HTML Attribute: aria-expanded
	 */
	@attr({ attribute: 'aria-expanded' })
	// @ts-expect-error Type is incorrectly non-optional
	public ariaExpanded: 'true' | 'false' | string | null;

	/**
	 * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
	 * @public
	 * @remarks
	 * HTML Attribute: aria-pressed
	 */
	@attr({ attribute: 'aria-pressed' })
	// @ts-expect-error Type is incorrectly non-optional
	public ariaPressed: 'true' | 'false' | 'mixed' | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIAButton extends ARIAGlobalStatesAndProperties {}
applyMixins(DelegatesARIAButton, ARIAGlobalStatesAndProperties);

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface VividFoundationButton extends DelegatesARIAButton {}
applyMixins(VividFoundationButton, DelegatesARIAButton);
