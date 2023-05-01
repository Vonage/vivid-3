import { attr } from '@microsoft/fast-element';
import {FoundationElement} from "@microsoft/fast-foundation";
import type {Popup} from "@vonage/vivid";

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
		return this.shadowRoot?.querySelector('.control') as Popup;
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
				this.#popupEl.anchor = this.anchor;
				this.anchorUpdated = this.#waitForAnchorElementUpdate();
				await this.anchorUpdated;
				this.#anchorUpdated();
			}
		}
	}

	#anchorUpdated(): void {
		this.#removeEventListener();
		this.#addEventListener();
	}

	async #waitForAnchorElementUpdate() {
		const oldAnchor = this.#popupEl && this.#popupEl.anchorEl;
		let attempts = 0;
		await new Promise((resolve) => {
			let interval = setInterval(() => {
				if ((this.#popupEl && this.#popupEl.anchorEl !== oldAnchor)) {
					resolve(this.#popupEl.anchorEl);
					clearInterval(interval);
				}
				if (attempts >= 10) {
					resolve(this.#popupEl.anchorEl);
					clearInterval(interval);
				}
				attempts++;
			}, 50)
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
