import { attr } from '@microsoft/fast-element';
import { Popup } from '../popup/popup';

/**
 * Base class for tooltip
 *
 * @public
 */
export class Tooltip extends Popup {
	/**
	 * the text of the tooltip
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	override connectedCallback(): void {
		super.connectedCallback();

		this.anchorElement?.addEventListener('mouseover', this.#show);
		this.anchorElement?.addEventListener('mouseout', this.#hide);
		this.anchorElement?.addEventListener('focusin', this.#show);
		this.anchorElement?.addEventListener('focusout', this.#hide);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();

		this.anchorElement?.removeEventListener('mouseover', this.#show);
		this.anchorElement?.removeEventListener('mouseout', this.#hide);
		this.anchorElement?.removeEventListener('focusin', this.#show);
		this.anchorElement?.removeEventListener('focusout', this.#hide);
	}

	#show = () => {
		this.open = true;
	}

	#hide = () => {
		this.open = false;
	}
}
