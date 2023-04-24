import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { Connotation } from '../enums';
import { AffixIcon } from '../shared/patterns/affix';

export type AlertConnotation =
	Connotation.Information |
	Connotation.Accent |
	Connotation.Success |
	Connotation.Warning |
	Connotation.Alert;

const connotationIconMap = new Map([
	[Connotation.Information, 'info-line'],
	[Connotation.Accent, 'megaphone-line'],
	[Connotation.Success, 'check-circle-line'],
	[Connotation.Warning, 'warning-line'],
	[Connotation.Alert, 'error-line']
]);

const defaultConnotation =
	(connotation: Connotation | undefined = Connotation.Accent) => connotationIconMap.get(connotation) as Connotation;

/**
 * Base class for alert
 *
 * @public
 * @slot action-items - Add action items to alert using this slot.
 */
export class Alert extends FoundationElement {
	// timeout to close the alert
	timeout: any;

	/**
	 * if the alert is removable
	 * accepts boolean
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) removable = false;

	/**
	 * the text of the alert heading
	 * accepts string
	 *
	 * @public
	 */
	@attr headline?: string;

	/**
	 * the text of the alert sub-heading
	 * accepts string
	 *
	 * @public
	 */
	@attr subtitle?: string;

	/**
	 * alert header icon
	 *
	 * @public
	 */
	@attr icon?: string;

	/**
	 * indicates whether the alert is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

	/**
	 * the timeout ms to show the alert
	 * accepts number
	 *
	 * @public
	 */
	@attr({ mode: 'fromView' }) timeoutms: number = 0;

	/**
	 * alert connotation
	 *
	 * @public
	 */
	@attr connotation?: AlertConnotation;

	get conditionedIcon() {
		return this.icon ?? defaultConnotation(this.connotation);
	}

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('keydown', this.#closeOnKeyDown);

		if (this.open) {
			this.#show();
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this.#closeOnKeyDown);
		clearTimeout(this.timeout);
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'open': {
				this.open ? this.#show() : this.#hide();
			}
		}
	}

	#show(): void {
		this.open = true;
		clearTimeout(this.timeout);
		if (this.timeoutms > 0) {
			this.timeout = setTimeout(() => this.#hide(), this.timeoutms);
		}
	}

	#hide(): void {
		this.open = false;
		clearTimeout(this.timeout);
	}

	#closeOnKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Escape' || !this.removable) {
			return;
		}
		this.#hide;
	};
}

applyMixins(Alert, AffixIcon);

export interface Alert extends AffixIcon {
}
