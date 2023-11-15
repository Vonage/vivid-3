import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { Connotation } from '../enums';
import { Localized } from '../../shared/patterns';
import { AffixIcon } from '../../shared/patterns/affix';

export type AlertConnotation =
	Connotation.Accent |
	Connotation.Information |
	Connotation.Success |
	Connotation.Warning |
	Connotation.Alert;

const connotationIconMap = new Map([
	[Connotation.Accent, 'megaphone-line'],
	[Connotation.Information, 'info-line'],
	[Connotation.Success, 'check-circle-line'],
	[Connotation.Warning, 'warning-line'],
	[Connotation.Alert, 'error-line']
]);

export type AlertPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';

/**
 * Base class for alert
 *
 * @public
 * @slot main - The main content of the alert.
 * @slot action-items - Add action items to alert using this slot.
 * @event open - Fired when the alert is opened
 * @event close - Fired when the alert is closed
 */
export class Alert extends FoundationElement {
	@attr({ attribute: 'dismiss-button-aria-label' }) dismissButtonAriaLabel: string | null = null;
	
	// timeout to close the alert
	#timeoutID?: NodeJS.Timeout;

	/**
	 * if the alert is removable
	 * accepts boolean
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) removable = false;

	/**
	 * the placement of the alert
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: AlertPlacement = 'bottom';


	/**
	 * the text of the alert heading
	 * accepts string
	 *
	 * @public
	 */
	@attr headline?: string;

	/**
	 * the main text of the alert
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	/**
	 * alert header icon
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * the timeout ms to show the alert
	 * accepts number
	 *
	 * @public
	 */
	@attr({
		mode: 'fromView',
		converter: nullableNumberConverter
	}) timeoutms: number = 0;

	/**
	 * alert connotation
	 *
	 * @public
	 */
	@attr connotation?: AlertConnotation;

	/**
	 *
	 * @internal
	 */
	controlEl?: HTMLDivElement;

	/**
	 * indicates whether the alert is open
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
			this.style.display = 'inline';
			if (this.removable) {
				const base = this.shadowRoot!.querySelector('.alert-text') as HTMLElement;
				base?.setAttribute('tabindex', '0');
				base.focus();
				base?.removeAttribute('tabindex');
			}
		}
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this.#closeOnEscape);
		this.controlEl = this.shadowRoot!.querySelector('.control') as HTMLDivElement;
		if (this.controlEl) this.controlEl.addEventListener('transitionend', this.#onTransitionEnd);
		this.#setupTimeout();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		if (this.#timeoutID) clearTimeout(this.#timeoutID);
		this.removeEventListener('keydown', this.#closeOnEscape);
		if (this.controlEl) this.controlEl.removeEventListener('transitionend', this.#onTransitionEnd);
	}

	get conditionedIcon() {
		return this.icon || connotationIconMap.get(this.connotation as AlertConnotation);
	}

	#setupTimeout() {
		if (this.#timeoutID) clearTimeout(this.#timeoutID);

		if (this.open && this.timeoutms > 0) {
			this.#timeoutID = setTimeout(() => this.open = false, this.timeoutms);
		}
	}

	#closeOnEscape = (e: KeyboardEvent) => {
		if (this.removable && e.key === 'Escape') this.open = false;
	};

	#onTransitionEnd = () => {
		if (!this.open) {
			this.style.display = 'none';
		}
	};
}

applyMixins(Alert, AffixIcon);
export interface Alert extends Localized, AffixIcon { }
applyMixins(Alert, Localized);