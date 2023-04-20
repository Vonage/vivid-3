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
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this.#closeOnKeyDown);
	}

	override remove(): void {
		this.$emit('removing');
		const alert = this.shadowRoot && this.shadowRoot.querySelector('.alert');
		if (alert) {
			alert.classList.add('removing');
			alert.addEventListener('transitionend', this.#handleRemoveEnd);
		}
	}

	#handleRemoveEnd = () => {
		this.$emit('removed');
		this.parentElement && this.parentElement.removeChild(this);
	};

	#closeOnKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Escape' || !this.removable) {
			return;
		}
		this.remove();
	};
}

applyMixins(Alert, AffixIcon);

export interface Alert extends AffixIcon {
}
