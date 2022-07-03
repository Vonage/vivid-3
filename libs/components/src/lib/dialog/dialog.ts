import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

// Make sure we support Safari 14
let dialogPolyfill: any;
(async () => {
	if (!HTMLDialogElement || !HTMLDialogElement.prototype.showModal) {
		// @ts-ignore
		delete window.HTMLDialogElement;
		dialogPolyfill = await import('dialog-polyfill');
	}
})();

/**
 * Base class for dialog
 *
 * @public
 */
export class Dialog extends FoundationElement {
	/**
	 * Indicates dialog's state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({mode: 'boolean'}) open = false;
	@attr({mode: 'fromView'}) returnValue?: string;
	@attr icon?: string;
	@attr content?: string;
	@attr heading?: string;

	#handleScrimClick = (event: MouseEvent) => {
		if (event.target !== this.#dialog) {
			return;
		}
		const rect = this.#dialog.getBoundingClientRect();

		const clickedInDialog = (
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width
		);

		if (clickedInDialog === false){
			this.close();
		}
	};
	#handleInternalFormSubmit = (event: SubmitEvent) => {
		if ((event.target as HTMLFormElement).method !== 'dialog') {
			return;
		}

		this.close();
	};

	close() {
		if (!this.open) {
			return;
		}
		this.#dialog.close();
		this.open = false;
		this.dispatchEvent(new CustomEvent('close', {bubbles: true, composed: true, detail: this.returnValue}));
	}

	show() {
		this.open = true;
	}

	#dialogElement?: HTMLDialogElement;

	get #dialog() {
		if (!this.#dialogElement) {
			this.#dialogElement = this.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
			if (dialogPolyfill) {
				dialogPolyfill.registerDialog(this.#dialogElement);
			}
		}
		return this.#dialogElement as HTMLDialogElement;
	}

	showModal() {
		this.#dialog.showModal();
		this.open = true;
	}

	override connectedCallback() {
		super.connectedCallback();
		this.#dialog.addEventListener('click', this.#handleScrimClick);
		this.#dialog.addEventListener('submit', this.#handleInternalFormSubmit);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#dialog.removeEventListener('click', this.#handleScrimClick);
		this.#dialog.removeEventListener('submit', this.#handleInternalFormSubmit);
	}
}
