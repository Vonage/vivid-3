import { FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

// Make sure we support Safari 14
let dialogPolyfill: any;
(async () => {
	if (!HTMLDialogElement || !HTMLDialogElement.prototype.showModal) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
	@attr headline?: string;
	@attr({attribute: 'aria-labelledby'}) ariaLabelledBy: string | null = null;
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;
	@attr({attribute: 'aria-describedby'}) ariaDescribedBy: string | null = null;

	#modal = false;

	get modal() {
		return this.#modal;
	}

	#dialogElement?: HTMLDialogElement;

	get #dialog() {
		if (!this.#dialogElement) {
			this.#dialogElement = this.shadowRoot!.querySelector('dialog') as HTMLDialogElement;
			if (this.#dialogElement) {
				this.#dialogElement.open = this.open;
				if (dialogPolyfill) {
					dialogPolyfill.registerDialog(this.#dialogElement);
				}
			}
		}
		return this.#dialogElement as HTMLDialogElement;
	}

	openChanged(oldValue: boolean, newValue: boolean) {
		if (oldValue === undefined) {
			return;
		}
		if (!newValue) {
			this.close();
		} else {
			if (this.#dialog) {
				this.#dialog.open = true;
			}
		}
	}

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

		this.open = clickedInDialog;
	};

	#handleInternalFormSubmit = (event: SubmitEvent) => {
		if ((event.target as HTMLFormElement).method !== 'dialog') {
			return;
		}

		this.open = false;
	};

	close() {
		if (this.#dialog.open) {
			this.#dialog.close();
			this.dispatchEvent(new CustomEvent('close', {bubbles: true, composed: true, detail: this.returnValue}));
		}

		this.open = false;
		this.#modal = false;
		this.#dialog.toggleAttribute('aria-modal', false);
	}

	show() {
		this.#dialog.show();
		this.open = true;
	}

	showModal() {
		this.#dialog.showModal();
		this.open = true;
		this.#modal = true;
		this.#dialog.toggleAttribute('aria-modal', true);
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
