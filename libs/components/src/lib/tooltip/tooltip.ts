import { attr } from '@microsoft/fast-element';
import {FoundationElement} from '@microsoft/fast-foundation';
import type {Popup} from '../popup/popup';

/**
 * Base class for tooltip
 *
 * @public
 */
export class Tooltip extends FoundationElement {
	/**
	 * the text of the tooltip
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	@attr anchor?: string | HTMLElement;

	@attr placement?: string;

	@attr({mode: 'boolean'}) open?: boolean;
	anchorUpdated?: Promise<void>;

	get #popupEl(): Popup {
		return this.shadowRoot!.querySelector('.control') as Popup;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#anchorUpdated();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#removeEventListener();
		document.removeEventListener('keydown', this.#closeOnEscape);
	}

	override async attributeChangedCallback(name: string, oldValue: string, newValue: string): Promise<void> {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'anchor') {
			if (oldValue !== newValue) {
				if (Boolean(await this.#waitForPopupEl())) {
					this.#popupEl.anchor = this.anchor;
					this.#anchorUpdated();
				}
			}
		}
	}

	#anchorUpdated(): void {
		this.#removeEventListener();
		this.#addEventListener();
	}

	#waitForPopupEl(): Promise<Popup | null> {
		return new Promise((resolve) => {
			if (this.#popupEl) resolve(this.#popupEl);
			setTimeout(() => {
				if (this.#popupEl) {
					resolve(this.#popupEl);
				}
			}, 10);
		});
	}

	#addEventListener(): void {
		this.#popupEl.anchorEl?.addEventListener('mouseover', this.#show);
		this.#popupEl.anchorEl?.addEventListener('mouseout', this.#hide);
		this.#popupEl.anchorEl?.addEventListener('focusin', this.#show);
		this.#popupEl.anchorEl?.addEventListener('focusout', this.#hide);
	}

	#removeEventListener(): void {
		this.#popupEl.anchorEl?.removeEventListener('mouseover', this.#show);
		this.#popupEl.anchorEl?.removeEventListener('mouseout', this.#hide);
		this.#popupEl.anchorEl?.removeEventListener('focusin', this.#show);
		this.#popupEl.anchorEl?.removeEventListener('focusout', this.#hide);
	}

	#show = () => {
		this.open = true;
	};

	#hide = () => {
		this.open = false;
	};

	#closeOnEscape = (e:KeyboardEvent) => {
		if (e.key === 'Escape') this.#hide();
	};

	openChanged(_: boolean, newValue: boolean): void {
		if (newValue) {
			document.addEventListener('keydown', this.#closeOnEscape);
		} else {
			document.removeEventListener('keydown', this.#closeOnEscape);
		}
	}
}
