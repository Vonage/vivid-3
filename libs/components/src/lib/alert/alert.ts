import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { Connotation } from '../enums';
import { Localized } from '../../shared/patterns';
import { AffixIcon } from '../../shared/patterns/affix';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog/index';

export type AlertConnotation =
	| Connotation.Accent
	| Connotation.Information
	| Connotation.Success
	| Connotation.Warning
	| Connotation.Announcement
	| Connotation.Alert;

const connotationIconMap = new Map([
	[Connotation.Accent, 'megaphone-line'],
	[Connotation.Information, 'info-line'],
	[Connotation.Success, 'check-circle-line'],
	[Connotation.Warning, 'warning-line'],
	[Connotation.Announcement, 'sparkles-line'],
	[Connotation.Alert, 'error-line'],
]);

export type AlertPlacement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end';

export type AlertStrategy = 'fixed' | 'static';

/**
 * @public
 * @component alert
 * @slot main - The main content of the Alert.
 * @slot action-items - Add action items to the Alert using this slot.
 * @slot icon - Add an icon to the component.
 * @event {CustomEvent<undefined>} open - Fired when the Alert is opened
 * @event {CustomEvent<undefined>} close - Fired when the Alert is closed
 */
export class Alert extends FoundationElement {
	/**
	 * Allows setting a custom aria-label for the dismiss button.
	 *
	 * @public
	 */
	@attr({ attribute: 'dismiss-button-aria-label' }) dismissButtonAriaLabel:
		| string
		| null = null;

	// timeout to close the alert
	#timeoutID?: NodeJS.Timeout;

	/**
	 * Adds a close button to the Alert.
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) removable = false;

	/**
	 * The placement of the Alert on the screen.
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: AlertPlacement = 'bottom';

	/**
	 * Adds a headline to the Alert.
	 *
	 * @public
	 */
	@attr headline?: string;

	/**
	 * The main text of the Alert.
	 *
	 * @public
	 */
	@attr text?: string;

	/**
	 * The icon to display in the Alert. Takes precedence over the connotation's icon.
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * Timeout after which the Alert will close.
	 *
	 * @public
	 */
	@attr({
		mode: 'fromView',
		converter: nullableNumberConverter,
	})
	timeoutms = 0;

	/**
	 * Sets an appropriate icon / icon color for the connotation.
	 *
	 * @public
	 */
	@attr connotation?: AlertConnotation;

	/**
	 * @internal
	 */
	controlEl?: HTMLDivElement;

	/**
	 * Controls the `position` of the Alert.
	 *
	 * @public
	 */
	@attr strategy?: AlertStrategy;

	/**
	 * Open state of the Alert.
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;
	openChanged(oldValue: boolean, newValue: boolean): void {
		if (oldValue === undefined) return;
		this.$emit(newValue ? 'open' : 'close');
		this.#setupTimeout();
		if (newValue) {
			this.style.display = 'contents';
			const alertText = this.shadowRoot!.querySelector(
				'.alert-text'
			) as HTMLElement;
			if (this.removable && alertText) {
				alertText.setAttribute('tabindex', '0');
				alertText.focus();
				alertText.removeAttribute('tabindex');
			}
		} else {
			this.style.display = 'none';
		}
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this.#closeOnEscape);
		this.controlEl = this.shadowRoot!.querySelector(
			'.control'
		) as HTMLDivElement;
		if (this.controlEl)
			this.controlEl.addEventListener('transitionend', this.#onTransitionEnd);
		this.#setupTimeout();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		if (this.#timeoutID) clearTimeout(this.#timeoutID);
		this.removeEventListener('keydown', this.#closeOnEscape);
		if (this.controlEl)
			this.controlEl.removeEventListener(
				'transitionend',
				this.#onTransitionEnd
			);
	}

	get conditionedIcon() {
		return (
			this.icon || connotationIconMap.get(this.connotation as AlertConnotation)
		);
	}

	#setupTimeout() {
		if (this.#timeoutID) clearTimeout(this.#timeoutID);

		if (this.open && this.timeoutms > 0) {
			this.#timeoutID = setTimeout(() => (this.open = false), this.timeoutms);
		}
	}

	#closeOnEscape = (e: KeyboardEvent) => {
		if (this.open && this.removable && handleEscapeKeyAndStopPropogation(e)) {
			this.open = false;
		}
	};

	#onTransitionEnd = () => {
		if (!this.open) {
			this.style.display = 'none';
		} else {
			this.style.display = 'contents';
		}
	};
}

applyMixins(Alert, AffixIcon);
export interface Alert extends Localized, AffixIcon {}
applyMixins(Alert, Localized);
