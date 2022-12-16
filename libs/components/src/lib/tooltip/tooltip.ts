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
		this.#anchorUpdated();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#removeEventListener();
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		this.#anchorUpdated();
	}

	#anchorUpdated(): void {
		this.#removeEventListener();
		this.#addEventListener();
	}

	#addEventListener(): void {
		this.anchorEl?.addEventListener('mouseover', this.#show);
		this.anchorEl?.addEventListener('mouseout', this.#hide);
		this.anchorEl?.addEventListener('focusin', this.#show);
		this.anchorEl?.addEventListener('focusout', this.#hide);
	}

	#removeEventListener(): void {
		this.anchorEl?.removeEventListener('mouseover', this.#show);
		this.anchorEl?.removeEventListener('mouseout', this.#hide);
		this.anchorEl?.removeEventListener('focusin', this.#show);
		this.anchorEl?.removeEventListener('focusout', this.#hide);
	}

	#show = () => {
		this.open = true;
	};

	#hide = () => {
		this.open = false;
	};
}
