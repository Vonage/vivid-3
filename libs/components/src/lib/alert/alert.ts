import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { Connotation } from '../enums';
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
 * @slot action-items - Add action items to alert using this slot.
 */
export class Alert extends FoundationElement {
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
	 * indicates whether the alert is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean'	}) open = false;
	openChanged(oldValue: boolean, newValue: boolean): void {
		if (oldValue === undefined) return;
		this.$emit(newValue ? 'open' : 'close');
		this.#setupTimeout();
	}

	override connectedCallback(): void {
		this.#setupTimeout();
		this.addEventListener('keydown', this.#closeOnEscape);
		super.connectedCallback();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		if (this.#timeoutID) clearTimeout(this.#timeoutID);
		this.removeEventListener('keydown', this.#closeOnEscape);
	}

	get conditionedIcon() {
		return this.icon ?? (this.connotation ? connotationIconMap.get(this.connotation) : this.connotation);
	}

	#setupTimeout() {
		if (this.#timeoutID) clearTimeout(this.#timeoutID);

		if (this.open && this.timeoutms > 0) {
			this.#timeoutID = setTimeout(() => this.open = false, this.timeoutms);
		}
	}

	#closeOnEscape = (e:KeyboardEvent) => {
		if (this.removable && e.key === 'Escape') this.open = false;
	};
}

applyMixins(Alert, AffixIcon);

export interface Alert extends AffixIcon {}
